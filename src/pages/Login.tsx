import { Link, useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import { RegisterBodyTypes } from "../utils/types";
import { login } from "../api";
import { Toaster } from "react-hot-toast";
import { credentialLoginHandler, redirectAfterToast } from "../utils/utilityFunctions";

const Login = () => {
    const [loginFormData, setLoginFormData] = useState<Pick<RegisterBodyTypes, "email"|"password">>({email:"", password:""});
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
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
                <label className="text-lg text-gray-700 py-1 mt-4">Enter your password</label>
                <div className="flex rounded-xl overflow-hidden">
                    <input className="text-lg text-gray-700 py-2 px-2 bg-gray-100 flex-1" type={isPasswordVisible?"text":"password"} name="password" placeholder="Password" onChange={(e) => onChangeHandler(e)} />
                    <button className="border border-gray-800 bg-gray-800 text-gray-100 w-8 hover:opacity-80 cursor-pointer" onClick={() => setIsPasswordVisible(!isPasswordVisible)}>{isPasswordVisible?"o":"O"}</button>
                </div>
                <button className="bg-gray-800 text-gray-50 w-full mt-4 py-2 text-lg rounded-xl hover:opacity-85 cursor-pointer" onClick={loginHandler}>User login</button>
                <button className="bg-gray-800 text-gray-50 w-full mt-4 py-2 text-lg rounded-xl hover:opacity-85 cursor-pointer" onClick={credentialLoginHandler}>User login using predefined credentials</button>
                {/*<Button text="User login" margin="25px 0 0 0" onClickHandler={loginHandler} />
                <Button text="User login using predefined credentials" margin="25px 0 0 0" onClickHandler={credentialLoginHandler} />*/}
                <button className="bg-gray-800 text-gray-50 w-full mt-4 py-2 text-lg rounded-xl hover:opacity-85 cursor-pointer" onClick={() => navigate("/driver/login")}>Go to driver login page</button>
                <p className="text-lg mt-5">Don't have a account? <Link to="/user/register" className="underline"> Register here</Link></p>
                {/*<Button text="Go to driver login page" onClickHandler={() => navigate("/driver/login")} />*/}
                <p className="text-xs mt-5">this site is protected by reCAPTCHA and the Google Policy and the Terms of Service apply </p>
            </div>
        </div>
    )
};

export default Login;