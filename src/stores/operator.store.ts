import {
  AddOperator,
  OperatorData,
  Signin,
  UpdateOperator,
  UpdateOperatorAsSuperAdmin,
} from "@/services/operator/operator.type";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import operatorService from "@/services/operator/operator.service";
import { useRoute, useRouter } from "vue-router";
import { saveLocalStorage } from "@/helpers/localStorage";
import { notify } from "@kyvg/vue3-notification";

export const useOperatorStore = defineStore("operator", () => {
  const route = useRoute();
  const router = useRouter();

  const isAuthenticated = ref(true);

  let operatorProfile = reactive<OperatorData>({
    email: "",
    firstName: "",
    lastName: "",
    role: "",
  });
  const isLoading = ref(false);

  const login = async (data: Signin) => {
    try {
      isLoading.value = true;
      const signinData = await operatorService.signin(data);
      saveLocalStorage(
        signinData.data.accessToken,
        import.meta.env.VITE_AUTH_TKE as string
      );
      if (route.query.next) {
        router.replace(route.query.next as string);
      }
      router.replace("/analytics");
    } catch (error: any) {
      notify({
        type: "error",
        title: "Authentication Error",
        text: error.message || "Could not login operator",
      });
      throw new Error(error.message || "Could not login operator");
    } finally {
      isLoading.value = false;
    }
  };
  const fetchOperator = async (id: string) => {
    try {
      isLoading.value = true;

      const operator = await operatorService.findOperator(id);

      return operator;
    } catch (error: any) {
      notify({
        type: "error",
        title: "Fetch Error",
        text: error.message || " could not fetch operator",
      });
      throw new Error(error.message || " could not fetch operator");
    } finally {
      isLoading.value = false;
    }
  };
  const createOperator = async (data: AddOperator) => {
    try {
      isLoading.value = true;
      const operator = await operatorService.createOperator(data);
      notify({
        type: "success",
        title: "Add Success",
        text: "Operator successfully added",
      });
      return operator;
    } catch (error: any) {
      notify({
        type: "error",
        title: "Add Error",
        text: error.message || " could not create operator",
      });
      throw new Error(error.message || " could not create operator");
    } finally {
      isLoading.value = false;
    }
  };

  const findManyOperators = async () => {
    try {
      isLoading.value = true;
      return await operatorService.findManyOperators();
    } catch (error: any) {
      notify({
        type: "error",
        title: "Fetch Error",
        text: error.message || " could not fetch operators",
      });
      throw new Error(error.message || " could not fetch operators");
    } finally {
      isLoading.value = false;
    }
  };
  const deleteOperator = async (id: string) => {
    try {
      isLoading.value = true;
      await operatorService.deleteOperator(id);
      notify({
        type: "success",
        title: "Delete Success",
        text: "Operator deleted successfully",
      });
    } catch (error: any) {
      notify({
        type: "error",
        title: "Delete Error",
        text: error.message || " could not delete operator",
      });
      throw new Error(error.message || " could not delete operator");
    } finally {
      isLoading.value = false;
    }
  };

  const fetchProfile = async () => {
    try {
      isLoading.value = true;

      const operator = await operatorService.fetchProfile();
      operatorProfile.email = operator.data.email;
      operatorProfile.firstName = operator.data.firstName;
      operatorProfile.lastName = operator.data.lastName;
      operatorProfile.role = operator.data.role;

      return operator;
    } catch (error: any) {
      notify({
        type: "error",
        title: "Fetch Error",
        text: error.message || " could not fetch profile",
      });
      throw new Error(error.message || " could not fetch profile");
    } finally {
      isLoading.value = false;
    }
  };

  const updateSelfOperator = async (data: UpdateOperator) => {
    try {
      isLoading.value = true;

      const operator = await operatorService.updateSelfOperator(data);
      operatorProfile = { ...operatorProfile, ...data };
      notify({
        type: "success",
        title: "Profile Update Success",
        text: "Profile updated successfully",
      });
      return operator;
    } catch (error: any) {
      notify({
        type: "error",
        title: "Update Error",
        text: error.message || " could not update profile",
      });
      throw new Error(error.message || " could not update self");
    } finally {
      isLoading.value = false;
    }
  };
  const updateOperator = async (
    id: string,
    data: UpdateOperatorAsSuperAdmin
  ) => {
    try {
      isLoading.value = true;
      await operatorService.updateOperator(id, data);
      notify({
        type: "success",
        title: "Update Success",
        text: "Operator updated successfully",
      });
    } catch (error: any) {
      notify({
        type: "error",
        title: "Update Error",
        text: error.message || " could not update operator",
      });
      throw new Error(error.message || " could not update operator");
    } finally {
      isLoading.value = false;
    }
  };
  return {
    operatorProfile,
    isLoading,
    updateSelfOperator,
    updateOperator,
    fetchProfile,
    isAuthenticated,
    route,
    router,
    login,
    createOperator,
    fetchOperator,
    deleteOperator,
    findManyOperators,
  };
});
