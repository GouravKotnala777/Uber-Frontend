import "../styles/pages/login.scss";
import logo from "../../public/uber-logo-1.png";
import { Link } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import { RegisterBodyTypes, RegisterDriverBodyTypes } from "../utils/types";
import { loginDriver } from "../api";

const DriverLogin = () => {
    const [loginFormData, setLoginFormData] = useState<Pick<RegisterBodyTypes&RegisterDriverBodyTypes, "email"|"password"|"licenseNumber"|"vehicleNumber">>({email:"", password:"", licenseNumber:"", vehicleNumber:""});

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setLoginFormData({...loginFormData, [e.target.name]:e.target.value});
    };

    const onClickHandler = async() => {
        const res = await loginDriver(loginFormData);
        console.log(res);
    };


    return(
        <div className="register_page_bg">
            <div className="logo_cont">
                <img src={logo} alt={logo} />
            </div>
            <div className="form_cont">
                <label>What's your email</label>
                <input type="text" name="email" placeholder="Email" onChange={(e) => onChangeHandler(e)} />
                <label>What's your licence number</label>
                <input type="text" name="licenseNumber" placeholder="Licence Number" onChange={(e) => onChangeHandler(e)} />
                <label>What's your vehicle number</label>
                <input type="text" name="vehicleNumber" placeholder="Vehicle Number" onChange={(e) => onChangeHandler(e)} />
                <label>Enter your password</label>
                <input type="text" name="password" placeholder="Password" onChange={(e) => onChangeHandler(e)} />
                <button className="register_btn" onClick={onClickHandler}>Login</button>
                <p>Don't have a account? <Link to="/driver/register" className="link"> Register here</Link></p>
                <p className="bottom_line">this site is protected by reCAPTCHA and the Google Policy and the Terms of Service apply </p>
            </div>
        </div>
    )
};

export default DriverLogin;