import { Link, useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import { RegisterDriverBodyTypes } from "../utils/types";
import { registerDriver } from "../api";
import { credentialDriverLoginHandler, redirectAfterToast } from "../utils/utilityFunctions";
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
        <div className="max-w-xs min-h-screen mx-auto p-2">
            <Toaster />
            <div className="text-2xl font-semibold text-gray-700 mt-5">Uber Clone</div>
            <div className="flex flex-col justify-between">
                <label className="text-lg text-gray-700 py-1 mt-4">What's your license number</label>
                <input className="text-lg text-gray-700 py-2 px-2 bg-gray-100 rounded-xl" type="text" name="licenseNumber" placeholder="License Number" onChange={(e) => onChangeHandler(e)} />
                <label className="text-lg text-gray-700 py-1 mt-4">Enter your password</label>
                <input className="text-lg text-gray-700 py-2 px-2 bg-gray-100 rounded-xl" type="text" name="password" placeholder="Password" onChange={(e) => onChangeHandler(e)} />

                <label className="text-lg text-gray-700 py-1 mt-4">Vehicle information</label>
                <div className="grid grid-cols-2 gap-2">
                    <input className="text-lg text-gray-700 py-2 px-2 bg-gray-100 rounded-xl" type="text" name="vehicleColor" placeholder="Vehicle Color" onChange={(e) => onChangeHandler(e)} />
                    <input className="text-lg text-gray-700 py-2 px-2 bg-gray-100 rounded-xl" type="text" name="vehicleNumber" placeholder="Vehicle Number" onChange={(e) => onChangeHandler(e)} />
                    <input className="text-lg text-gray-700 py-2 px-2 bg-gray-100 rounded-xl" type="text" name="vehicleModel" placeholder="Vehicle Model" onChange={(e) => onChangeHandler(e)} />
                    <select className="text-lg text-gray-700 py-2 px-2 bg-gray-100 rounded-xl" name="vehicleType" onChange={(e) => onChangeHandler(e)} >
                        <option value="">--select type--</option>
                        {
                            VEHICLE_TYPES_ARRAY.map((vehicle) => (
                                <option value={vehicle}>{vehicle}</option>
                            ))
                        }
                    </select>
                </div>
                <label className="text-lg text-gray-700 py-1 mt-4">Passenger capacity excluding driver</label>
                <input className="text-lg text-gray-700 py-2 px-2 bg-gray-100 rounded-xl" type="text" name="vehicleCapacity" placeholder="Vehicle Capacity" onChange={(e) => onChangeHandler(e)} />
                <button className="bg-gray-800 text-gray-50 w-full mt-4 py-2 text-lg rounded-xl hover:opacity-85 cursor-pointer" onClick={createDriverAccountHandler}>Create driver account</button>
                <button className="bg-gray-800 text-gray-50 w-full mt-4 py-2 text-lg rounded-xl hover:opacity-85 cursor-pointer" onClick={credentialDriverLoginHandler}>Login as driver using predefined credentials</button>
                <p className="text-lg mt-5">Already have a account? <Link to="/driver/login" className="underline"> Login here</Link></p>
                <button className="bg-gray-800 text-gray-50 w-full mt-4 py-2 text-lg rounded-xl hover:opacity-85 cursor-pointer" onClick={() => navigate("/user/register")}>Go to user register page</button>
                <p className="text-xs mt-5">this site is protected by reCAPTCHA and the Google Policy and the Terms of Service apply </p>
                
            </div>
        </div>
    )
};

export default DriverRegister;