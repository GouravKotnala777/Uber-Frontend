import { BsStarFill } from "react-icons/bs";
import { RideAcceptedEventMessageType } from "../pages/Home";
import "../styles/components/profile_long.scss";
import ImgWithFallback from "./ImgWithFallback";

const ProfileLong = ({driverDetails}:{driverDetails:RideAcceptedEventMessageType}) => {

    return(
        <div className="profile_long_cont">
            <div className="driver_photo">
                <ImgWithFallback src={driverDetails?.driverImg as string} fallbackSrc="unknown_user.png" />
                {
                    driverDetails?.otp &&
                        <div className="otp">
                            <div className="heading">OTP :</div>
                            <div className="value">&nbsp;{driverDetails?.otp}</div>
                        </div>
                }
            </div>
            <div className="driver_details">
                <div className="driver_name">{driverDetails?.driverName}</div>
                <div className="vehicle_number">{driverDetails?.vehicleDetailes.vehicleNumber}</div>
                <div className="vehicle_color">{driverDetails?.vehicleDetailes.vehicleColor}</div>
                <div className="vehicle_model">{driverDetails?.vehicleDetailes.vehicleModel}</div>
                <div className="driver_ratings"><BsStarFill className="BsStarFill" /><div className="value">{driverDetails?.rating}</div></div>
            </div>
        </div>
    )
};

export default ProfileLong;