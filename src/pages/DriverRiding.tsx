import "../styles/pages/driver_riding.scss";
import { CiLocationOff, CiLocationOn } from "react-icons/ci";
import { useState } from "react";
import ProfileShort from "../components/ProfileShort";
import { endRide } from "../api";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Heading from "../components/Heading";
import ShowHideToggler from "../components/ShowHideToggler";
import LiveTracking from "../components/LiveTracking";


const DriverRiding = () => {
    const [isRideDetailsHide, setisRideDetailsHide] = useState<boolean>(true);
    const {acceptedRide} = useLocation().state;
    const navigate = useNavigate();

    const endRideHandler = async() => {    
        const res = await endRide({rideID:acceptedRide._id});
                            
        if (res.success) {
            navigate("/driver/home");
        }
        else{
            console.log(res);
            console.log("nahi ho sakta hai");
            console.log("nahi ho sakta hai");
            console.log("nahi ho sakta hai");
            console.log("nahi ho sakta hai");
            console.log("nahi ho sakta hai");
            
            
        }
    };
    const hideRideHandler = () => {
        console.log("hide");
    }

    return(
        <div className="driver_riding_page_bg">
            {/*<pre>{JSON.stringify(acceptedRide, null, `\t`)}</pre>*/}
            <div className="map_cont">
                <LiveTracking />
            </div>
            <div className="riding_detail_panel_cont">
                <ShowHideToggler toggleHandler={() => setisRideDetailsHide(false)} />
                <Heading text="You are riding now" />
                <div className="riding_distance_cont">
                    <div className="heading">Total Distance</div>
                    <div className="value">2km</div>
                    <div className="heading">Remaining</div>
                    <div className="value">0.7km</div>
                </div>
                <div className="riding_duration_cont">
                    <div className="heading">Duration</div>
                    <div className="value">10min</div>
                </div>
            </div>
            <div className="passenger_request_panel_cont_outer" style={{top:isRideDetailsHide?"100%":"25%"}}>
                <ShowHideToggler toggleHandler={() => setisRideDetailsHide(true)} />
                <div className="passenger_request_panel_cont">
                    <ProfileShort name={acceptedRide.passengerName} amount={acceptedRide.fare} />
                    <div className="third_part">
                        <div className="pickup_location_details_cont">
                            <CiLocationOn className="CiLocationOn" />
                            <div className="pickup_location_details">
                                <div className="highlight_info">562/11-A</div>
                                <div className="full_info">{acceptedRide?.pickupLocation.address}</div>
                            </div>
                        </div>
                    </div>
                    <div className="fourth_part">
                        <div className="dropoff_location_details_cont">
                            <CiLocationOff className="CiLocationOff" />
                            <div className="dropoff_location_details">
                                <div className="highlight_info">Ho.No.371</div>
                                <div className="full_info">{acceptedRide?.dropoffLocation.address}</div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="fifth_part">
                        <Button text="End ride" onClickHandler={endRideHandler} />
                        <Button text="Hide" background="transparent" color="#717171" border={true} onClickHandler={hideRideHandler} />
                    </div>
                    
                </div>
            </div>
        </div>
    )
};

export default DriverRiding;