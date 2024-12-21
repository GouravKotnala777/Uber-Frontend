import { BsArrowDown } from "react-icons/bs";
import "../styles/pages/riding.scss";
import { MdSafetyCheck } from "react-icons/md";
import { FaLocationPin } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import { useState } from "react";
import { RideAcceptedEventMessageType } from "./Home";
import { useLocation } from "react-router-dom";
import { LocationTypes } from "../utils/types";
import Location from "../components/Location";
import ProfileLong from "../components/ProfileLong";
import Button from "../components/Button";
import Heading from "../components/Heading";
import ShowHideToggler from "../components/ShowHideToggler";


const Riding = () => {
    const [isRideDetailsHide, setisRideDetailsHide] = useState<boolean>(false);
    const {activeDriver, dropoffLocation}:{activeDriver:RideAcceptedEventMessageType|undefined; dropoffLocation:LocationTypes|undefined;} = useLocation().state;

    const makePaymentHandler = () => {
        console.log("payment");
    };

    return(
        <div className="riding_page_bg">
            {/*<pre>{JSON.stringify(activeDriver, null, `\t`)}</pre>*/}
            <div className="map_cont">map</div>
            <div className="another_cont">aa</div>
            <div className="meet_at_pickup_point_cont" style={{top:isRideDetailsHide?"100%":"20%", zIndex:isRideDetailsHide?"-1":"1"}}>
                <ShowHideToggler toggleHandler={() => setisRideDetailsHide(true)} />
                <div className="selected_ride">
                    <div className="first_part">
                        <Heading text="You are currently riding" />
                        <div className="timer">
                            <div className="value">2</div>
                            <div className="unit">min</div>
                        </div>
                    </div>
                    <ProfileLong driverDetails={activeDriver as RideAcceptedEventMessageType} />
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
                    <Location highlightAddress="Shop No.24" fullAddress={dropoffLocation?.address as string} />
                    <div className="sixth_part">
                        <Button text="Make payment" margin="15px 0 0 0" onClickHandler={makePaymentHandler} />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Riding;