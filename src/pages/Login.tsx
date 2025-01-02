import "../styles/pages/login.scss";
import logo from "/uber-logo-1.png";
import { Link, useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import { RegisterBodyTypes } from "../utils/types";
import { login } from "../api";
import Button from "../components/Button";
import { Toaster } from "react-hot-toast";
import { redirectAfterToast } from "../utils/utilityFunctions";

const Login = () => {
    const [loginFormData, setLoginFormData] = useState<Pick<RegisterBodyTypes, "email"|"password">>({email:"", password:""});
    const navigate = useNavigate();

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setLoginFormData({...loginFormData, [e.target.name]:e.target.value});
    };

    const loginHandler = async() => {
        if (!loginFormData.email || !loginFormData.password) {
            redirectAfterToast({res:{success:false, message:"All fields are required", jsonData:{}}});
        }
        else{
            if (!loginFormData.email.split("").includes("@") && !loginFormData.email.split("").includes(".")) {
                redirectAfterToast({res:{success:false, message:"Wrong email format", jsonData:{}}});
            } else {
                if (loginFormData.password.length < 6 || loginFormData.password.length > 20) {
                    redirectAfterToast({res:{success:false, message:"Password length should be 5 < password.length <= 20", jsonData:{}}});
                }
                else{
                    const res = await login(loginFormData);
                    redirectAfterToast({res, redirectWithReload:"/user/home"});
                }
            }
        }
    };


    return(
        <div className="register_page_bg">
            <Toaster />
            <div className="logo_cont">
                <img src={logo} alt={logo} />
            </div>
            <div className="form_cont">
                <label>What's your email</label>
                <input type="text" name="email" placeholder="Email" onChange={(e) => onChangeHandler(e)} />
                <label>Enter your password</label>
                <input type="text" name="password" placeholder="Password" onChange={(e) => onChangeHandler(e)} />
                <Button text="User login" margin="25px 0 0 0" onClickHandler={loginHandler} />
                <p>Don't have a account? <Link to="/user/register" className="link"> Register here</Link></p>
                <Button text="Go to driver login page" onClickHandler={() => navigate("/driver/login")} />
                <p className="bottom_line">this site is protected by reCAPTCHA and the Google Policy and the Terms of Service apply </p>
            </div>
        </div>
    )
};

export default Login;