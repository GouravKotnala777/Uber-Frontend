import { Link, useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import { RegisterBodyTypes, RegisterDriverBodyTypes } from "../utils/types";
import { loginDriver } from "../api";
import { credentialDriverLoginHandler, redirectAfterToast } from "../utils/utilityFunctions";
import { Toaster } from "react-hot-toast";

const DriverLogin = () => {
    const [loginFormData, setLoginFormData] = useState<Pick<RegisterBodyTypes&RegisterDriverBodyTypes, "email"|"password"|"licenseNumber"|"vehicleNumber">>({email:"", password:"", licenseNumber:"", vehicleNumber:""});
    const navigate = useNavigate();

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setLoginFormData({...loginFormData, [e.target.name]:e.target.value});
    };

    const driverLoginHandler = async() => {
        if (!loginFormData.email || !loginFormData.password || !loginFormData.licenseNumber || !loginFormData.vehicleNumber) {
            redirectAfterToast({res:{success:false, message:"All fields are required", jsonData:{}}});
        }
        else{
            if (!loginFormData.email.split("").includes("@") && !loginFormData.email.split("").includes(".")) {
                redirectAfterToast({res:{success:false, message:"Wrong email format", jsonData:{}}});
            }
            else{
                if (loginFormData.password.length < 6 || loginFormData.password.length > 20) {
                    redirectAfterToast({res:{success:false, message:"Password length should be 5 < password.length <= 20", jsonData:{}}});
                } else {
                    const res = await loginDriver(loginFormData);
                    if (res.success) {
                        if (res.message === "Driver login successful") {
                            redirectAfterToast({res, redirectWithReload:"/driver/home"});
                        }
                        else{
                            redirectAfterToast({res, redirectWithReload:"/user/verify/?userType=driver"});
                        }
                    }
                    else{
                        redirectAfterToast({res});
                    }
                }
            }
        }
    };


    return(
        <div className="max-w-xs min-h-screen mx-auto p-2">
            <Toaster />
            <div className="text-2xl font-semibold text-gray-700 mt-5">Uber Clone</div>
            <div className="flex flex-col justify-between">
                <label className="text-lg text-gray-700 py-1 mt-4">What's your email</label>
                <input className="text-lg text-gray-700 py-2 px-2 bg-gray-100 rounded-xl" type="text" name="email" placeholder="Email" onChange={(e) => onChangeHandler(e)} />
                <label className="text-lg text-gray-700 py-1 mt-4">What's your licence number</label>
                <input className="text-lg text-gray-700 py-2 px-2 bg-gray-100 rounded-xl" type="text" name="licenseNumber" placeholder="Licence Number" onChange={(e) => onChangeHandler(e)} />
                <label className="text-lg text-gray-700 py-1 mt-4">What's your vehicle number</label>
                <input className="text-lg text-gray-700 py-2 px-2 bg-gray-100 rounded-xl" type="text" name="vehicleNumber" placeholder="Vehicle Number" onChange={(e) => onChangeHandler(e)} />
                <label className="text-lg text-gray-700 py-1 mt-4">Enter your password</label>
                <input className="text-lg text-gray-700 py-2 px-2 bg-gray-100 rounded-xl" type="text" name="password" placeholder="Password" onChange={(e) => onChangeHandler(e)} />
                <button className="bg-gray-800 text-gray-50 w-full mt-4 py-2 text-lg rounded-xl hover:opacity-85 cursor-pointer" onClick={driverLoginHandler}>Login as driver</button>
                <button className="bg-gray-800 text-gray-50 w-full mt-4 py-2 text-lg rounded-xl hover:opacity-85 cursor-pointer" onClick={credentialDriverLoginHandler}>Login as driver using predefined credentials</button>

                <p className="text-lg mt-5">Don't have a account? <Link to="/driver/register" className="underline"> Register here</Link></p>
                <button className="bg-gray-800 text-gray-50 w-full mt-4 py-2 text-lg rounded-xl hover:opacity-85 cursor-pointer" onClick={() => navigate("/user/login")}>Go to user login page</button>

                <p className="text-xs mt-5">this site is protected by reCAPTCHA and the Google Policy and the Terms of Service apply </p>
            </div>
        </div>
    )
};

export default DriverLogin;