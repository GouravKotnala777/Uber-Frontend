import toast from "react-hot-toast";
import { ResponseType } from "./types";
import { NavigateFunction } from "react-router-dom";

export const redirectAfterToast = ({res, redirectWithReload, redirectWithoutReload, toastDuration}:{res:ResponseType<Record<string, string|number|boolean|object>>; redirectWithReload?:string; redirectWithoutReload?:{navigate:NavigateFunction; url:string;}; toastDuration?:number;}) => {
    if (res.success) {
        toast.success(res.message, {
            position:"top-center",
            duration:toastDuration||3000
        });
        setTimeout(() => {
            if (redirectWithReload) {
                window.location.href = redirectWithReload;
            }
            else if (redirectWithoutReload) {
                redirectWithoutReload.navigate(redirectWithoutReload.url);
            }
            else{
                console.log("redirect nahi hoga");
            }
        }, 3500);
    }
    else{
        toast.error(res.message, {
            position:"top-center",
            duration:3000
        })
    }
};