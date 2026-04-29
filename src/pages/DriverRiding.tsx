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

//const acceptedRide = {
//    _id:"",
//    distance:16,
//    fare:102,
//    passengerName:"gourav Kotnala",
//    pickupLocation:{
//        latitude:123456543,
//        longitude:123456432,
//        address:"saldkaskdj sadlkjasdk askdljk kasjdkl"
//    },
//    dropoffLocation:{
//        latitude:123456543,
//        longitude:123456432,
//        address:"saldkaskdj sadlkjasdk askdljk kasjdkl"
//    },
//    passengerImg:""
//}

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
        <div className="relative max-w-xs h-screen max-h-screen mx-auto overflow-hidden">
            <Toaster />
            {/*<pre>{JSON.stringify(acceptedRide, null, `\t`)}</pre>*/}
            <div className="map_cont">
                <LiveTracking />
            </div>
            <div className="border absolute bottom-0 w-full bg-white">
                <ShowHideToggler toggleHandler={() => setisRideDetailsHide(false)} />
                <Heading text="You are riding now" fontSize="16px" fontWeight={600} />
                <div className="flex gap-4 mt-2 ml-2">
                    <div className="text-sm">Total Distance</div>
                    <div className="text-sm font-semibold text-gray-700">{((acceptedRide.distance as number)/1000).toFixed(1)}km</div>
                </div>
                <div className="flex gap-4 mt-2 ml-2">
                    <div className="text-sm">Remaining</div>
                    <div className="text-sm font-semibold text-gray-700">0.7km</div>
                </div>
                <div className="flex gap-4 mt-2 ml-2">
                    <div className="text-sm">Duration</div>
                    <div className="text-sm font-semibold text-gray-700">{acceptedRide.fare}min</div>
                </div>
            </div>
            <Panel isPanelActive={!isRideDetailsHide}>
                <ShowHideToggler toggleHandler={() => setisRideDetailsHide(true)} />
                <div className="h-[66%] relative">
                    <ScrollableContainer height="100%">
                        <ProfileShort name={acceptedRide.passengerName} amount={acceptedRide.fare} distance={acceptedRide.distance as number} profileImg={acceptedRide?.passengerImg as string} />
                        <Location highlightAddress="Ho.No.371" fullAddress={acceptedRide?.pickupLocation.address + "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, earum totam. Odit earum cupiditate tempore dolorem vero cumque quibusdam suscipit dicta incidunt hic omnis dignissimos nihil, optio sed id sunt?"} />
                        <Location highlightAddress="ShopNo.23" fullAddress={acceptedRide?.dropoffLocation.address + "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, earum totam. Odit earum cupiditate tempore dolorem vero cumque quibusdam suscipit dicta incidunt hic omnis dignissimos nihil, optio sed id sunt?"} />
                    </ScrollableContainer>
                    <div className="absolute top-0 left-0 w-full h-15 bg-linear-180 from-white to-transparent pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-full h-15 bg-linear-0 from-white to-transparent pointer-events-none"></div>
                </div>
                <Button text="End ride" margin="10px 0" onClickHandler={endRideHandler} />
                <Button text="Hide" background="transparent" color="#717171" border={true} onClickHandler={hideRideHandler} />
            </Panel>
        </div>
    )
};

export default DriverRiding;