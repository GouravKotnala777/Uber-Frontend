import "../styles/pages/login.scss";
import logo from "../../public/uber-logo-1.png";
import { Link } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import { RegisterDriverBodyTypes } from "../utils/types";
import { registerDriver } from "../api";


const DriverRegister = () => {
    const [registerDriverFormData, setRegisterDriverFormData] = useState<RegisterDriverBodyTypes>({licenseNumber:"", password:"", vehicleColor:"", vehicleModel:"", vehicleNumber:"", vehicleType:"uberX"});

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
        setRegisterDriverFormData({...registerDriverFormData, [e.target.name]:e.target.value});
    };

    const onClickHandler = async() => {
        const res = await registerDriver(registerDriverFormData);
        console.log(registerDriverFormData);
        console.log(res);
    };

    return(
        <div className="register_page_bg">
        <div className="logo_cont">
            <img src={logo} alt={logo} />
        </div>
        <div className="form_cont">
            {/*<label>What's your name</label>
            <div className="fullname_cont">
                <input type="text" className="first_name" name="firstName" placeholder="First Name" />
                <input type="text" className="first_name" name="lastName" placeholder="Last Name" />
            </div>
            <label>What's your email</label>
            <input type="text" name="email" placeholder="Email" />*/}
            <label>What's your license number</label>
            <input type="text" name="licenseNumber" placeholder="License Number" onChange={(e) => onChangeHandler(e)} />
            <label>Enter your password</label>
            <input type="text" name="password" placeholder="Password" onChange={(e) => onChangeHandler(e)} />

            <label>Vehicle information</label>
            <div className="vehicle_info_inps">
                <input type="text" name="vehicleColor" placeholder="Vehicle Color" onChange={(e) => onChangeHandler(e)} />
                <input type="text" name="vehicleNumber" placeholder="Vehicle Number" onChange={(e) => onChangeHandler(e)} />
                <input type="text" name="vehicleModel" placeholder="Vehicle Model" onChange={(e) => onChangeHandler(e)} />
                <select name="vehicleType" onChange={(e) => onChangeHandler(e)} >
                    <option value="">--select type--</option>
                    <option value="car">car</option>
                    <option value="motorcycle">motorcycle</option>
                    <option value="auto">auto</option>
                    <option value="van">van</option>
                </select>
            </div>

            <button className="register_btn" onClick={onClickHandler}>Create Driver Account</button>
            <p>Already have a account? <Link to="/user/login" className="link"> Login here</Link></p>
            <p className="bottom_line">this site is protected by reCAPTCHA and the Google Policy and the Terms of Service apply </p>
            
        </div>
    </div>
    )
};

export default DriverRegister;