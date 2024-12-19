import { BsStarFill } from "react-icons/bs";
import "../styles/pages/riding.scss";
import { BiSend } from "react-icons/bi";
import { MdSafetyCheck } from "react-icons/md";
import { FaLocationPin } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import { useState } from "react";
import vite from "../../public/vite.svg";
import { RideAcceptedEventMessageType } from "./Home";
import { useLocation } from "react-router-dom";
import { LocationTypes } from "../utils/types";

const activeRide:RideAcceptedEventMessageType = {
    driverEmail:"driver@gmail.com",
    driverGender:"male",
    driverName:"Driver Name",
    driverMobile:"9958780321",
    licenseNumber:"license1234",
    otp:"",
    rating:"0",
    status:"in-progress",
    vehicleDetailes:{
        vehicleColor:"red",
        vehicleModel:"model12",
        vehicleNumber:"HR14D1234",
        vehicleType:"uberX"
    }
};

const Riding = () => {
    const [isRideDetailsHide, setisRideDetailsHide] = useState<boolean>(false);
    const {activeDriver, dropoffLocation}:{activeDriver:RideAcceptedEventMessageType|undefined; dropoffLocation:LocationTypes|undefined;} = useLocation().state;

    return(
        <div className="riding_page_bg">
            {/*<pre>{JSON.stringify(activeDriver, null, `\t`)}</pre>*/}
            <div className="map_cont">map</div>
            <div className="another_cont">aa</div>
            <div className="meet_at_pickup_point_cont" 
            style={{top:isRideDetailsHide?"100%":"20%", zIndex:isRideDetailsHide?"-1":"1"}}
            >
                <div className="selected_ride">
                    <div className="first_part">
                        <div className="panel_heading">You are currently riding...</div>
                        <div className="timer">
                            <div className="value">2</div>
                            <div className="unit">min</div>
                        </div>
                    </div>
                    <div className="second_part">
                        <div className="driver_photo">
                            <img src={vite} alt={vite} />
                        </div>
                        <div className="driver_details">
                            <div className="driver_name">{activeDriver?.driverName}</div>
                            <div className="vehicle_number">{activeDriver?.vehicleDetailes.vehicleNumber}</div>
                            <div className="vehicle_color">{activeDriver?.vehicleDetailes.vehicleColor}</div>
                            <div className="vehicle_model">{activeDriver?.vehicleDetailes.vehicleModel}</div>
                            <div className="driver_ratings"><BsStarFill className="BsStarFill" /><div className="value">{activeDriver?.rating}</div></div>
                        </div>
                    </div>
                    <div className="fourth_part">
                        <div className="safety_cont">
                            <div className="safety_icon"><MdSafetyCheck className="MdSafetyCheck" /> </div>
                            <div className="safety_heading">Safety</div>
                        </div>
                        <div className="share_my_trip_cont">
                            <div className="share_my_trip_icon"><FaLocationPin className="FaLocationPin" /></div>
                            <div className="share_my_trip_heading">Share my trip</div>
                        </div>
                        <div className="call_driver_cont">
                            <div className="call_driver_icon"><IoCall className="IoCall" /></div>
                            <div className="call_driver_heading">Call driver</div>
                        </div>
                    </div>
                    <div className="fifth_part">
                        <div className="pickup_location_details_cont">
                            <CiLocationOn className="CiLocationOn" />
                            <div className="pickup_location_details">
                                <div className="highlight_info">562/11-A</div>
                                <div className="full_info">{dropoffLocation?.address}</div>
                            </div>
                        </div>
                    </div>
                    <div className="sixth_part">
                        <button className="make_payment_btn">Make payment</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Riding;