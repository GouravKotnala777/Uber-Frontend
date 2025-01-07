import "../styles/pages/riding.scss";
import { MdOutlineLocationOn } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
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
import { Panel, ScrollableContainer } from "../components/WrapperContainers";
import ShortCuts from "../components/ShortCuts";
import { TbShieldPin } from "react-icons/tb";
import AllReviews from "../components/AllReviews";


const shortcuts = [
    {icon:TbShieldPin, heading:"Safety", subHeading:"patoni"},
    {icon:MdOutlineLocationOn, heading:"Share my trip", subHeading:"patoni"},
    {icon:IoCallOutline, heading:"Call driver", subHeading:"patoni"}
];

const Riding = () => {
    const [isRideDetailsActive, setisRideDetailsActive] = useState<boolean>(true);
    const {activeDriver, dropoffLocation}:{activeDriver:RideAcceptedEventMessageType|undefined; dropoffLocation:LocationTypes|undefined;} = useLocation().state;
    const socketContext = useContext<SocketContextTypes|null>(SocketDataContext);
    const navigate = useNavigate();

    if (!socketContext) {
        // Handle the case where the context is null
        throw new Error("SocketDataContext is not provided!");
    };

    const {receiveMessage} = socketContext;

    const makePaymentHandler = async() => {
        const newPayment = await createPayment({rideID:activeDriver?.rideID as string, amount:1234, paymentMethod:"cash", paymentStatus:"completed"});
        redirectAfterToast({res:newPayment, redirectWithoutReload:{navigate, url:"/user/home"}})
    };

    useEffect(() => {
        receiveMessage("ride-cancelled", (data) => {
            console.log(data as {data:{rideID:string}});
            redirectAfterToast({res:{success:false, message:"Driver cancelled ride", jsonData:{}}, redirectWithReload:"/user/home"});
        })
    }, []);
    useEffect(() => {
        receiveMessage("ride-ended", (data) => {
            console.log(data as {data:{rideID:string}});
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
            <Panel isPanelActive={isRideDetailsActive} onClosePosition="-67%" onCloseZInd="2" hasRideAcceptedHide={true}>
                <ShowHideToggler toggleHandler={() => setisRideDetailsActive(!isRideDetailsActive)} />
                <ScrollableContainer height="80%">
                    <div className="first_part">
                        <Heading text="You are currently riding" />
                        <div className="timer">
                            <div className="value">2</div>
                            <div className="unit">min</div>
                        </div>
                    </div>
                    <ProfileLong driverDetails={activeDriver as RideAcceptedEventMessageType} />
                    <ShortCuts shortcuts={shortcuts} />
                    <Location highlightAddress="Shop No.24" fullAddress={dropoffLocation?.address as string} />
                    <AllReviews driverID={activeDriver?.driverID as string} rideID={activeDriver?.rideID as string} />
                </ScrollableContainer>
                {
                    activeDriver?.rideID &&
                        <Button text="Make payment" margin="15px 0 0 0" onClickHandler={makePaymentHandler} />
                }
            </Panel>
        </div>
    )
};

export default Riding;