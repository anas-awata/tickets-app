import axios from "axios";
import { store } from "../redux/store";

//base url
const client = axios.create({
  baseURL: "https://assignments.aigate.me/backend_technical_test/public/api",
});

//axios interceptor
export const request = ({ ...options }) => {
  //get token from state
  const token = store.getState().token;

  client.defaults.headers.common.Authorization = `Bearer ${token}`;
  const onSuccess = (response) => response;
  const onError = (error) => {
    if (error.response) {
      // client received an error response (5xx, 4xx)
      console.log("400", error);
    } else if (error.request) {
      // client never received a response, or request never left
      console.log(error);
    } else {
      // anything else
      console.log("else", error);
      window.location.replace("./login");
    }
    return error;
  };
  return client(options).then(onSuccess).catch(onError);
};

//axios request for every endpoint

export const register = async (data) => {
  return request({ url: "register", method: "POST", data: data });
};

export const login = async (data) => {
  return request({ url: "login", method: "POST", data: data });
};

export const createTicket = async (data) => {
  return request({ url: "create-ticket", method: "POST", data: data });
};

export const addReport = async (data) => {
  return request({ url: "add-report", method: "POST", data: data });
};

export const viewServices = async () => {
  return request({ url: "view-services" });
};

export const getTickets = async () => {
  return request({ url: "get-tickets" });
};

export const viewTicket = async (id) => {
  return request({ url: `view-ticket/${id}` });
};

export const deleteTicket = async (id) => {
  return request({ url: `delete-ticket/${id}`, method: "DELETE" });
};

export const logout = async () => {
  return request({ url: "logout", method: "DELETE" });
};
