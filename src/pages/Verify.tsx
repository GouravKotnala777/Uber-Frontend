import { ChangeEvent, useState } from "react";
import Input from "../components/Input";
import { verifyDriver, verifyUser } from "../api";
import { redirectAfterToast } from "../utils/utilityFunctions";
import { Toaster } from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import { ResponseType } from "../utils/types";
import Heading from "../components/Heading";


const Verify = () => {
    const [otp, setOtp] = useState<string>("");
    const [searchParams] = useSearchParams();

    const userType = searchParams.get("userType");

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setOtp(e.target.value);
    }
    const onClickHandler = async() => {
        if (!otp) {
            redirectAfterToast({res:{success:false, message:"OTP not found", jsonData:{}}});
            return;
        }
        if (otp.split("").length < 6) {
            redirectAfterToast({res:{success:false, message:"OTP should have six digits", jsonData:{}}});
            return;
        }
        let sendSMSRes:ResponseType<any> = {success:false, message:"", jsonData:{}};
        if (userType === "passenger") {
            sendSMSRes = await verifyUser({otp});
            
        }
        else if(userType === "driver"){
            sendSMSRes = await verifyDriver({otp});
        }
        else{
            redirectAfterToast({res:{success:false, message:"userType not found", jsonData:{}}});
        }

        if (sendSMSRes.success) {
            redirectAfterToast({res:sendSMSRes, redirectWithReload:`${userType === "passenger"?"/user/home":"/driver/home"}`});
            console.log("OTP has sended");
        }
        else{
            redirectAfterToast({res:sendSMSRes});
            console.log({userType});
        }
    }

    return(
        <div className="max-w-xs min-h-screen mx-auto p-2 bg-gray-50">
            <Toaster />
            <div className="text-2xl font-semibold text-gray-700 mt-5">Uber Clone</div>
            <Heading text={`${userType === "passenger"?"Verify user":"Verify driver"}`} fontSize="16px" fontWeight={600} padding="20px 0 0 0" />
            <div className="flex justify-start my-10 gap-7">
                {
                    otp.split("").map((num) => (
                        <div className="text-5xl font-mono font-bold text-gray-700">{num}</div>
                    ))
                }
            </div>
            <Input placeholder="OTP" margin="15px 0 0 0" background="transparent" maxLength={6} border="2px solid black" letterSpacing="34px" onChangeHandler={(e) => onChangeHandler(e)} />
            <button className="bg-gray-800 text-gray-50 w-full mt-4 py-2 text-lg rounded-xl hover:opacity-85 cursor-pointer" onClick={onClickHandler}>Verify</button>
        </div>
    )
};

export default Verify;