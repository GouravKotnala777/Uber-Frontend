import toast from "react-hot-toast";
import { ResponseType } from "./types";
import { NavigateFunction } from "react-router-dom";
import { BsStar, BsStarFill } from "react-icons/bs";
import { IconType } from "react-icons";
import { login, loginDriver } from "../api";

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
};
export const showStarsForRating = (num:number) => {
    let starsArr:IconType[] = [];
    for(let i=1; i<=5; i++){
        if (i<=num) {
            starsArr.push(BsStarFill);
        }
        else{
            starsArr.push(BsStar);
        }
    }
    return starsArr;
};
export const setScrollPositionHandler = (elementID:string) => {
    const scrollingElement = document.getElementById(elementID);
    if (!scrollingElement) return;
    scrollingElement.scrollTop = scrollingElement.scrollHeight - scrollingElement.clientHeight;
};
export const credentialLoginHandler = async() => {
    const res = await login({email:"user1@gmail.com", password:"uuuuuu"});
    if (res.success) {
        if (res.message === "User login successful") {
            redirectAfterToast({res, redirectWithReload:"/user/home"});
        }
        else{
            redirectAfterToast({res, redirectWithReload:"/user/verify?userType=passenger"});
        }
    }
    else{
        redirectAfterToast({res});
    }
};
export const credentialDriverLoginHandler = async() => {
    const res = await loginDriver({email:"user4@gmail.com", password:"uuuuuu", licenseNumber:"licence00004", vehicleNumber:"hr00004"});
    if (res.success) {
        if (res.message === "Driver login successful") {
            redirectAfterToast({res, redirectWithReload:"/driver/home"});
        }
        else{
            redirectAfterToast({res, redirectWithReload:"/driver/verify?userType=driver"});
        }
    }
    else{
        redirectAfterToast({res});
    }
};