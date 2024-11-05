import axiosInstance from "../config/axiosConfig";

type Request = {
  url: string;
  body?: any;
};

const del = (url: string) => axiosInstance.delete(url);

const get = async ({ url }: Request) => {
  return (await axiosInstance.get(url)).data;
};

const post = async ({ url, body }: Request) => {
  const d = await axiosInstance.post(url, body);
   return d.data
};

const patch = ({ url, body }: Request) => axiosInstance.patch(url, body);

const put = ({ url, body }: Request) => axiosInstance.put(url, body);

const request = {
  delete: del,
  get,
  patch,
  post,
  put,
};

export default request;
