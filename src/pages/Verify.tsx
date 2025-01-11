import "../styles/pages/verify.scss";
import { ChangeEvent, useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
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
        <div className="verify_cont">
            <Toaster />
            <Heading text={`${userType === "passenger"?"Verify user":"Verify driver"}`} />
            <div className="digits_cont">
                {
                    otp.split("").map((num) => (
                        <div className="digit_cont">{num}</div>
                    ))
                }
            </div>
            <Input placeholder="OTP" margin="15px 0 0 0" background="transparent" maxLength={6} border="2px solid black" letterSpacing="34px" onChangeHandler={(e) => onChangeHandler(e)} />
            <Button text="Verify" margin="15px 0" onClickHandler={onClickHandler} />
        </div>
    )
};

export default Verify;