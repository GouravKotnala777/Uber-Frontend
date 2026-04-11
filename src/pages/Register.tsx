import { Link } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import { RegisterBodyTypes } from "../utils/types";
import { register } from "../api";
import { credentialLoginHandler, redirectAfterToast } from "../utils/utilityFunctions";
import { Toaster } from "react-hot-toast";

const Register = () => {
    const [registerFormData, setRegisterFormData] = useState<RegisterBodyTypes>({firstName:"", lastName:"", email:"", password:"", mobile:"", gender:"male"});

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
        setRegisterFormData({...registerFormData, [e.target.name]:e.target.value});
    };

    const registerHandler = async() => {
        if (!registerFormData.firstName || !registerFormData.lastName || !registerFormData.email || !registerFormData.password || !registerFormData.gender || !registerFormData.mobile) {
            redirectAfterToast({res:{success:false, message:"All fields are required", jsonData:{}}});
        }
        else{
            if (!registerFormData.email.split("").includes("@") && !registerFormData.email.split("").includes(".")) {
                redirectAfterToast({res:{success:false, message:"Wrong email format", jsonData:{}}});
            }
            else{
                if (registerFormData.firstName.length < 2) {
                    redirectAfterToast({res:{success:false, message:"First name length should be greater than 1", jsonData:{}}});
                }
                else{
                    if (registerFormData.mobile.length < 10 || registerFormData.mobile.length > 10) {
                        redirectAfterToast({res:{success:false, message:"Mobile number length should be equal to 10", jsonData:{}}});
                    }
                    else{
                        if (registerFormData.password.length < 6 || registerFormData.password.length > 20) {
                            redirectAfterToast({res:{success:false, message:"Password length should be 5 < password.length <= 20", jsonData:{}}});
                        }
                        else{
                            const res = await register(registerFormData);
                            if (res.success) {
                                redirectAfterToast({res, redirectWithReload:"/user/verify?userType=passenger"});
                            } else {
                                redirectAfterToast({res});
                            }
                        }
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
                <label className="text-lg text-gray-700 py-1 mt-4">What's your name</label>
                <div className="flex justify-between">
                    <input className="text-lg text-gray-700 py-2 px-2 w-30 bg-gray-100 rounded-xl" type="text" name="firstName" placeholder="First Name"  onChange={(e) => onChangeHandler(e)} />
                    <input className="text-lg text-gray-700 py-2 px-2 w-30 bg-gray-100 rounded-xl" type="text" name="lastName" placeholder="Last Name" onChange={(e) => onChangeHandler(e)} />
                </div>
                <label className="text-lg text-gray-700 py-1 mt-4">What's your email</label>
                <input className="text-lg text-gray-700 py-2 px-2 bg-gray-100 rounded-xl" type="text" name="email" placeholder="Email" onChange={(e) => onChangeHandler(e)} />
                
                <label className="text-lg text-gray-700 py-1 mt-4">Enter your password</label>
                <input className="text-lg text-gray-700 py-2 px-2 bg-gray-100 rounded-xl" type="password" name="password" placeholder="Password" onChange={(e) => onChangeHandler(e)} />
                
                <label className="text-lg text-gray-700 py-1 mt-4">Enter your mobile number</label>
                <input className="text-lg text-gray-700 py-2 px-2 bg-gray-100 rounded-xl" type="text" name="mobile" placeholder="Mobile" onChange={(e) => onChangeHandler(e)} />
                
                <label className="text-lg text-gray-700 py-1 mt-4">Enter your gender</label>
                <select className="text-lg text-gray-700 py-2 px-2 bg-gray-100 rounded-xl" onChange={(e) => onChangeHandler(e)}>
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
                <button className="bg-gray-800 text-gray-50 w-full mt-4 py-2 text-lg rounded-xl hover:opacity-85 cursor-pointer" onClick={registerHandler}>User register</button>
                <button className="bg-gray-800 text-gray-50 w-full mt-4 py-2 text-lg rounded-xl hover:opacity-85 cursor-pointer" onClick={credentialLoginHandler}>User login using predefined credentials</button>
                <p className="text-lg mt-5">Already have a account? <Link to="/user/login" className="underline"> Login here</Link></p>
                {/*<button className="bg-gray-800 text-gray-50 w-full mt-4 py-2 text-lg rounded-xl hover:opacity-85 cursor-pointer" onClick={() => navigate("/driver/register")}>Go to driver register page</button>*/}
                <p className="text-xs mt-5">this site is protected by reCAPTCHA and the Google Policy and the Terms of Service apply </p>
                
            </div>
        </div>
    )
};

export default Register;