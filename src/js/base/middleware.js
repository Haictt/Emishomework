import axios from "axios";
import enums from "./MISAEnum.js";
import resource from "./MISAResource.js";
import { mapActions, createPinia } from "pinia";
import { toastStore } from "./toaststore.js";
const api = axios.create();

/**
 * Chặn request lại và thêm các config cần thiết trước khi được xử lý bởi then/catch
 * AUTHOR: D.P.Hai + ChatGPT
 */
api.interceptors.request.use(
  (config) => {
    if (!window.navigator.onLine) {
      // Handle internet connectivity error
      toastStore().addToast("Internal");
      return Promise.reject(new Error("Internet connection is not available."));
    }

    // Modify the request config here (if needed)
    return config;
  },
  (error) => {
    // Handle request errors here
    return Promise.reject(error);
  }
);

/**
 * Chặn response lại và xử lý hoặc handle lỗi trước khi được xử lý bởi then/catch
 * AUTHOR: D.P.Hai + ChatGPT
 */
api.interceptors.response.use(
  (response) => {
    // Modify the response data here (if needed)
    return response;
  },
  (error) => {
    // Handle response errors here
    if (error.response) {
      let statusCode = error.response.status;
      let msg = error.response.data.DevMessage;
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      switch (statusCode) {
        case enums.HttpStatusCode.BadRequest:
          if (msg == resource.Empty || msg == resource.Wrong) {
            toastStore().addToast("NotValid");
          } else {
            toastStore().addToast("NotValid");
          }
          break;
        case enums.HttpStatusCode.ServerError:
          toastStore().addToast("Internal");
          break;
        case enums.HttpStatusCode.NotFound:
          toastStore().addToast("NotFound");
          break;
        case enums.HttpStatusCode.Conflict:
          toastStore().addToast("Conflict");
          break;
        default:
          toastStore().addToast("Internal");
          break;
      }
      console.log("Error status:", error.response);
    } else if (error.request) {
      // The request was made but no response was received
      console.log("No response received:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error message:", error.message);
    }

    return Promise.reject(error);
  }
);
export default api;
