import "../styles/pages/riding.scss";
import { MdSafetyCheck } from "react-icons/md";
import { FaLocationPin } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import { useContext, useEffect, useState } from "react";
import { RideAcceptedEventMessageType } from "./Home";
import { useLocation, useNavigate } from "react-router-dom";
import { LocationTypes } from "../utils/types";
import Location from "../components/Location";
import ProfileLong from "../components/ProfileLong";
import Button from "../components/Button";
import Heading from "../components/Heading";
import ShowHideToggler from "../components/ShowHideToggler";
import LiveTracking from "../components/LiveTracking";
import { createPayment } from "../api";
import { SocketContextTypes, SocketDataContext } from "../contexts/SocketContext";
import { redirectAfterToast } from "../utils/utilityFunctions";
import { Toaster } from "react-hot-toast";


const Riding = () => {
    const [isRideDetailsHide, setisRideDetailsHide] = useState<boolean>(false);
    const {activeDriver, dropoffLocation}:{activeDriver:RideAcceptedEventMessageType|undefined; dropoffLocation:LocationTypes|undefined;} = useLocation().state;
    const socketContext = useContext<SocketContextTypes|null>(SocketDataContext);
    const [rideID, setRideID] = useState<string>("");
    const navigate = useNavigate();

    if (!socketContext) {
        // Handle the case where the context is null
        throw new Error("SocketDataContext is not provided!");
    };

    const {receiveMessage} = socketContext;

    const makePaymentHandler = async() => {
        const newPayment = await createPayment({rideID, amount:1234, paymentMethod:"cash", paymentStatus:"completed"});
        redirectAfterToast({res:newPayment, redirectWithoutReload:{navigate, url:"/user/home"}})

        //rideID ke liye ride detailes chahiye location.state se,
        //end-ride event receive karna hai riding page per user ke dwara,
        //end-ride event send karwana hai driverRiding page per driver ke dwara
    };

    useEffect(() => {
        receiveMessage("ride-cancelled", (data) => {
            console.log("RIDE cancelled Ride cancelled (1)");
            console.log("RIDE cancelled Ride cancelled (1)");
            console.log(data as {data:{rideID:string}});
            setRideID((data as {rideID:string}).rideID)
            console.log("RIDE cancelled Ride cancelled (2)");
            console.log("RIDE cancelled Ride cancelled (2)");
            redirectAfterToast({res:{success:false, message:"Driver cancelled ride", jsonData:{}}, redirectWithReload:"/user/home"});
        })
    }, []);
    useEffect(() => {
        receiveMessage("ride-ended", (data) => {
            console.log("ZZZZZZZZZZZZZZZZZZZZZ (1)");
            console.log("ZZZZZZZZZZZZZZZZZZZZZ (1)");
            console.log(data as {data:{rideID:string}});
            setRideID((data as {rideID:string}).rideID)
            console.log("ZZZZZZZZZZZZZZZZZZZZZ (2)");
            console.log("ZZZZZZZZZZZZZZZZZZZZZ (2)");
            redirectAfterToast({res:{success:true, message:"Ride ended", jsonData:{}}});
        })
    }, []);

    return(
        <div className="riding_page_bg">
            <Toaster />
            {/*<pre>{JSON.stringify(activeDriver, null, `\t`)}</pre>*/}
            <div className="map_cont">
                <LiveTracking />
            </div>
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
                    {
                        rideID &&
                            <Button text="Make payment" margin="15px 0 0 0" onClickHandler={makePaymentHandler} />
                    }
                </div>
            </div>
        </div>
    )
};

export default Riding;