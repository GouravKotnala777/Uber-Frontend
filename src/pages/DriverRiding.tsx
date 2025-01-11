import "../styles/pages/driver_riding.scss";
import { useContext, useEffect, useState } from "react";
import ProfileShort from "../components/ProfileShort";
import { endRide } from "../api";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Heading from "../components/Heading";
import ShowHideToggler from "../components/ShowHideToggler";
import LiveTracking from "../components/LiveTracking";
import Location from "../components/Location";
import { Panel, ScrollableContainer } from "../components/WrapperContainers";
import { redirectAfterToast } from "../utils/utilityFunctions";
import { Toaster } from "react-hot-toast";
import { PAYMENT_DONE } from "../utils/constants";
import { SocketContextTypes, SocketDataContext } from "../contexts/SocketContext";


const DriverRiding = () => {
    const [isRideDetailsHide, setisRideDetailsHide] = useState<boolean>(true);
    const {acceptedRide} = useLocation().state;
    const navigate = useNavigate();
    const socketContext = useContext<SocketContextTypes|null>(SocketDataContext);

    if (!socketContext) throw Error("socketDataContext not provided");

    const {receiveMessage} = socketContext;
    const endRideHandler = async() => {    
        const res = await endRide({rideID:acceptedRide._id});
        redirectAfterToast({res, redirectWithoutReload:{navigate, url:"/driver/home"}});
    };
    const hideRideHandler = () => {
        console.log("hide");
    }
    useEffect(() => {
        receiveMessage(PAYMENT_DONE, (data) => {
            console.log(data);
            redirectAfterToast({res:{success:true, message:(data as string), jsonData:{}}});
        });
    }, []);

    return(
        <div className="driver_riding_page_bg">
            <Toaster />
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
            <Panel isPanelActive={!isRideDetailsHide}>
                <ShowHideToggler toggleHandler={() => setisRideDetailsHide(true)} />
                <ScrollableContainer height="66%">
                    <ProfileShort name={acceptedRide.passengerName} amount={acceptedRide.fare} />
                    <Location highlightAddress="Ho.No.371" fullAddress={acceptedRide?.pickupLocation.address + "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, earum totam. Odit earum cupiditate tempore dolorem vero cumque quibusdam suscipit dicta incidunt hic omnis dignissimos nihil, optio sed id sunt?"} />
                    <Location highlightAddress="ShopNo.23" fullAddress={acceptedRide?.dropoffLocation.address + "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, earum totam. Odit earum cupiditate tempore dolorem vero cumque quibusdam suscipit dicta incidunt hic omnis dignissimos nihil, optio sed id sunt?"} />
                </ScrollableContainer>
                <Button text="End ride" margin="10px 0" onClickHandler={endRideHandler} />
                <Button text="Hide" background="transparent" color="#717171" border={true} onClickHandler={hideRideHandler} />
            </Panel>
        </div>
    )
};

export default DriverRiding;