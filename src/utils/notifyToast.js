import {toast} from "react-toastify";

export const showSuccess = (message) => {
    toast.success(message,{autoClose:1000});
};

export const showError = (message) => {
    toast.error(message,{autoClose:1000});
};