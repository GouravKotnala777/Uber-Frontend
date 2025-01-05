import "../styles/pages/login.scss";
import { Toaster } from "react-hot-toast";
import logo from "/public/uber-logo-1.png";
import { useState } from "react";
import { logout, logoutDriver } from "../api";
import { redirectAfterToast } from "../utils/utilityFunctions";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Heading from "../components/Heading";

const Logout = () => {
    const [logoutConfirm, setLogoutConfirm] = useState<boolean>(false);
    const {logoutFor}:{logoutFor:"user"|"driver"} = useLocation().state || {state:{logoutFor:null}};
    const navigate = useNavigate();

    const logoutHandler = async() => {
        if (!logoutConfirm) {
            redirectAfterToast({res:{success:false, message:"Please tick the confirmation", jsonData:{}}});
            return;
        }
        if (!logoutFor) {
            redirectAfterToast({res:{success:false, message:"Something went wrong from frontend", jsonData:{}}});
            return;
        }
        if (logoutFor === "user") {
            const userLogoutRes = await logout();
            if (userLogoutRes.success) {
                redirectAfterToast({res:userLogoutRes, redirectWithReload:"/user/home"});
            }
            else{
                redirectAfterToast({res:userLogoutRes});
            }
        }
        else{
            const driverLogoutRes = await logoutDriver();
            if (driverLogoutRes.success) {
                redirectAfterToast({res:driverLogoutRes, redirectWithReload:"/driver/home"});
            }
            else{
                redirectAfterToast({res:driverLogoutRes});
            }
        }
    };

    return(
        <div className="logout_page_bg">
            <Toaster />
            <div className="logo_cont">
                <img src={logo} alt={logo} />
            </div>
            <Heading padding="30px 24%" text={logoutFor === "driver"?"Driver logout page":"User logout page"} />
            <div className="logout_form_cont">
                <label>Do you want to logout</label>
                <input type="checkbox" className="logout_confirm_checkbox" onChange={(e) => setLogoutConfirm(e.target.checked)} />
                <Button text={logoutFor === "driver"?"Driver logout":"User logout"} margin="15px 0" onClickHandler={logoutHandler} />
                <Button text="No, go back home" margin="15px 0" background="transparent" color="black" border onClickHandler={() => navigate(-1)} />
            </div>
        </div>
    )
};

export default Logout;