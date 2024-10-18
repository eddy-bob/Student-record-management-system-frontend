import { useRoute } from "vue-router";

const isActive = (path: string): boolean => {
  const route = useRoute();
  return route.fullPath.match(path) ? true : false;
};

export default isActive;
