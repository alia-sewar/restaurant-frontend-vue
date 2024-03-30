import { useUserStore } from "@/stores/user";

const headers = () => {
  const userStore = useUserStore();
  const token = userStore.getToken();
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "none",
  };
};

const headerUploadFiles = () => {
  const userStore = useUserStore();
  const token = userStore.getToken();
  return {
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
    Authorization: token ? `Bearer ${token}` : "none",
  };
};

export { headers, headerUploadFiles };
