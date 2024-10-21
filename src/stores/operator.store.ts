import {
  OperatorData,
  Signin,
  UpdateOperator,
} from "@/services/operator/operator.type";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import operatorService from "@/services/operator/operator.service";
import { useRoute, useRouter } from "vue-router";
import { saveLocalStorage } from "@/helpers/localStorage";

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
        process.env.VITE_AUTH_TKE as string
      );
      if (route.query.next) {
        router.replace(route.query.next as string);
      }
      router.replace("/analytics");
    } catch (error: any) {
      throw new Error(error.message || " could not login operator");
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
      return operator;
    } catch (error: any) {
      throw new Error(error.message || " could not update self");
    } finally {
      isLoading.value = false;
    }
  };
  return {
    operatorProfile,
    isLoading,
    updateSelfOperator,
    fetchProfile,
    isAuthenticated,
    route,
    router,
    login,
  };
});
