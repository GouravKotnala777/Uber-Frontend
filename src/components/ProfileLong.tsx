import { BsStarFill } from "react-icons/bs";
import { RideAcceptedEventMessageType } from "../pages/Home";
//import "../styles/components/profile_long.scss";
import ImgWithFallback from "./ImgWithFallback";

const ProfileLong = ({driverDetails}:{driverDetails:RideAcceptedEventMessageType}) => {

    return(
        <div className="flex justify-between px-2 py-2">
            <div className="h-25 w-25">
                <ImgWithFallback src={driverDetails?.driverImg as string} fallbackSrc="unknown_user.png" />
                {
                    driverDetails?.otp &&
                        <div className="ml-2 flex">
                            <div className="text-xs text-gray-600">OTP :</div>
                            <div className="text-xs font-semibold">&nbsp;{driverDetails?.otp}</div>
                        </div>
                }
            </div>
            <div className="flex flex-col gap-1 w-[50%] text-sm text-right">
                <div className="text-md font-medium">{driverDetails?.driverName}</div>
                <div className="">{driverDetails?.vehicleDetailes.vehicleNumber}</div>
                <div className="text-gray-600">{driverDetails?.vehicleDetailes.vehicleColor}</div>
                <div className="text-gray-600">{driverDetails?.vehicleDetailes.vehicleModel}</div>
                <div className="flex items-center gap-1 text-xs ml-auto w-min">
                    <BsStarFill className="" />
                    <div className="">{driverDetails?.rating}</div>
                </div>
            </div>
        </div>
    )
};

export default ProfileLong;