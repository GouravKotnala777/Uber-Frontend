import "../styles/pages/login.scss";
import logo from "/uber-logo-1.png";
import { Link, useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import { RegisterBodyTypes, RegisterDriverBodyTypes } from "../utils/types";
import { loginDriver } from "../api";
import Button from "../components/Button";

const DriverLogin = () => {
    const [loginFormData, setLoginFormData] = useState<Pick<RegisterBodyTypes&RegisterDriverBodyTypes, "email"|"password"|"licenseNumber"|"vehicleNumber">>({email:"", password:"", licenseNumber:"", vehicleNumber:""});
    const navigate = useNavigate();

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setLoginFormData({...loginFormData, [e.target.name]:e.target.value});
    };

    const driverLoginHandler = async() => {
        const res = await loginDriver(loginFormData);
        console.log(res);
        if (res.success) {
            window.location.href = "/driver/home";
        }
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
                <Button text="Login as driver" margin="25px 0 0 0" onClickHandler={driverLoginHandler} />
                <p>Don't have a account? <Link to="/driver/register" className="link"> Register here</Link></p>
                <Button text="Go to user login page" margin="0 0 0 0" onClickHandler={() => navigate("/user/login")} />
                <p className="bottom_line">this site is protected by reCAPTCHA and the Google Policy and the Terms of Service apply </p>
            </div>
        </div>
    )
};

export default DriverLogin;