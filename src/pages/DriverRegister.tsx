import "../styles/pages/login.scss";
import logo from "/uber-logo-1.png";
import { Link, useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import { RegisterDriverBodyTypes } from "../utils/types";
import { registerDriver } from "../api";
import Button from "../components/Button";
import { redirectAfterToast } from "../utils/utilityFunctions";
import { Toaster } from "react-hot-toast";
import { VEHICLE_TYPES_ARRAY } from "../utils/constants";


const DriverRegister = () => {
    const [registerDriverFormData, setRegisterDriverFormData] = useState<RegisterDriverBodyTypes>({licenseNumber:"", password:"", vehicleColor:"", vehicleModel:"", vehicleNumber:"", vehicleType:"uberX", vehicleCapacity:0});
    const navigate = useNavigate();

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
        setRegisterDriverFormData({...registerDriverFormData, [e.target.name]:e.target.value});
    };

    const createDriverAccountHandler = async() => {
        if (!registerDriverFormData.licenseNumber || !registerDriverFormData.password || !registerDriverFormData.vehicleColor || !registerDriverFormData.vehicleModel || !registerDriverFormData.vehicleNumber || !registerDriverFormData.vehicleType || !registerDriverFormData.vehicleCapacity) {
            redirectAfterToast({res:{success:false, message:"All fields are required", jsonData:{}}});
        } else {
            if (registerDriverFormData.password.length < 6 || registerDriverFormData.password.length > 20) {
                redirectAfterToast({res:{success:false, message:"Password length should be 5 < password.length <= 20", jsonData:{}}});
            }
            else{
                const res = await registerDriver(registerDriverFormData);
                if (res.success) {
                    redirectAfterToast({res, redirectWithReload:"/user/verify?userType=driver"});
                }
                else{
                    redirectAfterToast({res});
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
                        {
                            VEHICLE_TYPES_ARRAY.map((vehicle) => (
                                <option value={vehicle}>{vehicle}</option>
                            ))
                        }
                    </select>
                </div>
                <label>Passenger capacity excluding driver</label>
                <input type="text" name="vehicleCapacity" placeholder="Vehicle Capacity" onChange={(e) => onChangeHandler(e)} />
                <Button text="Create driver account" margin="25px 0 0 0" onClickHandler={createDriverAccountHandler} />
                <p>Already have a account? <Link to="/driver/login" className="link"> Login here</Link></p>
                <Button text="Go to user register page" margin="0 0 0 0" onClickHandler={() => navigate("/user/register")} />
                <p className="bottom_line">this site is protected by reCAPTCHA and the Google Policy and the Terms of Service apply </p>
                
            </div>
        </div>
    )
};

export default DriverRegister;