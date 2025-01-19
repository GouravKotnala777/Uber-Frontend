import toast from "react-hot-toast";
import { ResponseType } from "./types";
import { NavigateFunction } from "react-router-dom";
import { BsStar, BsStarFill } from "react-icons/bs";
import { IconType } from "react-icons";

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