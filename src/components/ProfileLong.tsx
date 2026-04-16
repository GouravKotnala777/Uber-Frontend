import { BsStarFill } from "react-icons/bs";
import { RideAcceptedEventMessageType } from "../pages/Home";
//import "../styles/components/profile_long.scss";
import ImgWithFallback from "./ImgWithFallback";

const ProfileLong = ({driverDetails}:{driverDetails:RideAcceptedEventMessageType}) => {

    return(
        <div className="flex justify-between">
            <div className="h-25 w-25 flex">
                <ImgWithFallback src={driverDetails?.driverImg as string} fallbackSrc="unknown_user.png" />
                {
                    driverDetails?.otp &&
                        <div className="otp">
                            <div className="heading">OTP :</div>
                            <div className="value">&nbsp;{driverDetails?.otp}</div>
                        </div>
                }
            </div>
            <div className="w-[50%] text-sm">
                <div className="text-lg font-medium">{driverDetails?.driverName}</div>
                <div className="">{driverDetails?.vehicleDetailes.vehicleNumber}</div>
                <div className="text-gray-600">{driverDetails?.vehicleDetailes.vehicleColor}</div>
                <div className="text-gray-600">{driverDetails?.vehicleDetailes.vehicleModel}</div>
                <div className=""><BsStarFill className="BsStarFill" /><div className="">{driverDetails?.rating}</div></div>
            </div>
        </div>
    )
};

export default ProfileLong;