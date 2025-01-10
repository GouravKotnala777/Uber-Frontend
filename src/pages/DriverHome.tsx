import "../styles/pages/driver_home.scss";
import { ChangeEvent, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { BiStopwatch } from "react-icons/bi";
import { PiSpeedometer } from "react-icons/pi";
import { FiFile } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { acceptRideRequest, cancelRide, myAllPastRidesDriver, startRide, updateMyDrivingProfile } from "../api";
import { SocketContextTypes, SocketDataContext } from "../contexts/SocketContext";
import { UserContextTypes, UserInitialDataContext } from "../contexts/UserContext";
import { DriverContextTypes, DriverInitialContextData } from "../contexts/DriverContext";
import { ChatTypes, DriverTypesPopulated, LocationTypes, RideStatusTypes, RideTypesPopulated, UserTypes, VehicleTypeTypes } from "../utils/types";
import Location from "../components/Location";
import ProfileShort from "../components/ProfileShort";
import ShortCuts from "../components/ShortCuts";
import Button from "../components/Button";
import Heading from "../components/Heading";
import ChatPanel from "../components/ChatPanel";
import LiveTracking from "../components/LiveTracking";
import ProfilePanel from "../components/ProfilePanel";
import { Panel, ScrollableContainer } from "../components/WrapperContainers";
import { SendMessageInput } from "../components/SendMessageInput";
import ShowHideToggler from "../components/ShowHideToggler";
import { redirectAfterToast } from "../utils/utilityFunctions";
import { Toaster } from "react-hot-toast";
import MenuButton from "../components/MenuButton";
import CarListItem from "../components/CarListItem";

import uberX from "/uber-x.png";
import uberAuto from "/uber-tuktuk.png";
import uberScooty from "/uber-scooty.png";
import uberMoto from "/uber-moto.png";
import uberComfort from "/uber-comfort.png";
import uberHCV from "/uber-hcv.png";
import uberPool from "/uber-pool.png";
import uberXL from "/uber-xl.png";
import Toggler from "../components/Toggler";
import { JOIN, NEW_MESSAGE, NEW_RIDE, SEND_LOCATION_TO_PASSENGER, UPDATE_DRIVER_LOCATION, vehicleCapacity, vehicleDescription } from "../utils/constants";

export interface NewRideNotificationTypes {
    _id:string;
    pickupLocation:LocationTypes;
    dropoffLocation:LocationTypes;
    distance:number;
    duration:number;
    fare:number;
    status:RideStatusTypes;
    otp:string;
    passengerID:string;
    passengerName:string;
    passengerEmail:string;
    passengerMobile:string;
    passengerSocketID:string;
    passengerGender:"male"|"female"|"other";
};


export const vehicleImages = {uberAuto, uberX, uberMoto, uberScooty, uberComfort, uberHCV, uberPool, uberXL};
const shortcuts = [
    {icon:BiStopwatch, heading:"10.2", subHeading:"heading"},
    {icon:PiSpeedometer, heading:"30", subHeading:"heading"},
    {icon:FiFile, heading:"20", subHeading:"heading"}
];

const DriverHome = () => {
    //const [isLocationPanelActive, setIsLocationPanelActive] = useState<boolean>(true);
    const [hasRideAccepted, setHasRideAccepted] = useState<boolean>(false);
    const [hasRideAcceptedHide, setHasRideAcceptedHide] = useState<boolean>(false);
    const [homePanelActive, setHomePanelActive] = useState<boolean>(true);
    
    
    
    const [isRideRequestPoppedUp, setIsRideRequestPoppedUp] = useState<string[]>([]);
    const [newRidesNotifications, setNewRidesNotifications] = useState<NewRideNotificationTypes[]>([]);
    const [myPastRides, setMyPastRides] = useState<RideTypesPopulated[]>([]);
    const [isMyPastTripsPanelActive, setIsMyPastTripsPanelActive] = useState<boolean>(false);
    const [isShortcutMenuActive, setIsShortcutMenuActive] = useState<boolean>(false);




    const [activePassenger, setActivePassenger] = useState<Pick<UserTypes, "_id"|"name"|"email"|"mobile"|"socketID">|null>(null);
    const [acceptedRide, setAcceptedRide] = useState<NewRideNotificationTypes|null>(null);
    const [otpInp, setOtpInp] = useState<string>("");
    const [isOtpValid, setIsOtpValid] = useState<boolean>(false);
    const [isChatPanelActive, setIsChatPanelActive] = useState<boolean>(false);
    const [isMyProfilePanelActive, setIsMyProfilePanelActive] = useState<boolean>(false);
    //const [newChatNotification, setNewChatNotification] = useState<number>(0);
    const [messages, setMessages] = useState<ChatTypes[]>([]);
    const navigate = useNavigate();
    const socketContext = useContext<SocketContextTypes|null>(SocketDataContext);
    const userContext = useContext<UserContextTypes>(UserInitialDataContext);
    const driverContext = useContext<DriverContextTypes>(DriverInitialContextData);

    if (!socketContext) throw Error("socketDataContext not provided");
    if (!userContext) throw Error("UserInitialDataContext not provided");
    if (!driverContext) throw Error("driverContext not provided");

    //const {user, setUser, updateUser} = userContext;
    const {driverContextData, setDriverContextData} = driverContext;
    const {sendMessage, receiveMessage} = socketContext;


    const acceptRequestHandler = async(requestPopup:NewRideNotificationTypes) => {
        setIsRideRequestPoppedUp([]);
        setHasRideAccepted(true);
        setHasRideAcceptedHide(true);
        const acceptRideRes = await acceptRideRequest({
            rideID:requestPopup._id,
            status:"accepted"});
        redirectAfterToast({res:acceptRideRes});
        setActivePassenger({
            _id:requestPopup.passengerID,
            name:requestPopup.passengerName,
            email:requestPopup.passengerEmail,
            mobile:requestPopup.passengerMobile,
            socketID:requestPopup.passengerSocketID
        });
        setAcceptedRide(requestPopup);
    };
    const ignoreRequestHandler = (rideID:string) => {
        setIsRideRequestPoppedUp((prev) => prev.filter((item) => item !== rideID));
    };
    const goToRidePageHandler = () => {
        setHasRideAcceptedHide(false);
        navigate("/driver/riding", {state:{acceptedRide}});
    };
    const cancelRideHandler = async() => {
        setHasRideAcceptedHide(false);
        const startedRide = await cancelRide({rideID:acceptedRide?._id as string});
        redirectAfterToast({res:startedRide, redirectWithReload:"/driver/home"});
        //redirectAfterToast({res:{success:false, message:"Ride cancelled", jsonData:{}}});        
    };


    const startedRideHandler = async() => {
        const startedRide = await startRide({rideID:acceptedRide?._id as string, otp:otpInp});
        redirectAfterToast({res:startedRide});
        if (startedRide.success) {
            setIsOtpValid(true);
        }
    };

    const updateDriverAvailablityStatusHandler = async() => {
        const updateDriverAvailablityStatus = await updateMyDrivingProfile({availabilityStatus:!driverContextData.driver?.availabilityStatus});
        setDriverContextData!({
            isLoading:false,
            driver:updateDriverAvailablityStatus.jsonData
        });
        if (updateDriverAvailablityStatus.success) {
            redirectAfterToast({res:{success:true, message:!driverContextData.driver?.availabilityStatus?"You are now online":"You are offline", jsonData:{}}});
        }
        else{
            redirectAfterToast({res:{success:false, message:updateDriverAvailablityStatus.message, jsonData:updateDriverAvailablityStatus.jsonData}});
        }
    };



    //useEffect(() => {
    //    myDriverProfile()
    //    .then((res) => {
    //        setDriver(res.jsonData);
    //    }).catch((err) => {
    //        console.log(err);
    //    })
    //}, []);
    useEffect(() => {
        if (driverContextData.driver) {
            sendMessage(JOIN, {userID:driverContextData.driver?.userID._id as string, userType:"driver"});
        }
    }, [driverContextData.driver]);
    useEffect(() => {
        receiveMessage(NEW_RIDE, (data) => {
            console.log("DATADATADATADATADATADATADATADATA (1)");
            console.log(data);
            //const {passengerName, passengerEmail, passengerMobile, passengerGender, passengerSocketID} = (data as NewRideNotificationTypes);
            setNewRidesNotifications((prev) => [...prev, data as NewRideNotificationTypes]);
            setIsRideRequestPoppedUp((prev) => [...prev, (data as NewRideNotificationTypes)._id]);
            //setActivePassenger({name:passengerName, email:passengerEmail, mobile:passengerMobile, gender:passengerGender, socketID:passengerSocketID});
            console.log("DATADATADATADATADATADATADATADATA (2)");
        })
    }, []);
    useEffect(() => {
        receiveMessage(NEW_MESSAGE, (data) => {
            console.log(data);
            setMessages((prev) => [...prev, data as ChatTypes]);
            //setNewChatNotification((prev) => prev+1);
        });
    }, []);
    useEffect(() => {

        const updateLocation = () => {
            navigator.geolocation.getCurrentPosition(p => {
                console.log(p.coords);
            })
            if (navigator.geolocation) {
                console.log({
                    passengerSocketID:activePassenger?.socketID,
                    driverID:driverContextData.driver?._id as string,
                    eventName:SEND_LOCATION_TO_PASSENGER,
                    location:{
                        ltd:1.2345,
                        lng:2.2345
                    }});
                
                sendMessage(UPDATE_DRIVER_LOCATION, {
                    message:{
                        passengerSocketID:activePassenger?.socketID,
                        driverID:driverContextData.driver?._id as string,
                        eventName:SEND_LOCATION_TO_PASSENGER,
                        location:{
                            ltd:1.2345,
                            lng:2.2345
                        }
                    }
                })
                
                //navigator.geolocation.getCurrentPosition(position => 
                //    //sendMessage(UPDATE_DRIVER_LOCATION, {
                //    //    message:{
                //    //        passengerSocketID:activePassenger?.socketID,
                //    //        driverID:user?._id as string,
                //    //        eventName:"ride-accepted",
                //    //        location:{
                //    //            ltd:position.coords.latitude,
                //    //            lng:position.coords.longitude
                //    //        }
                //    //    }
                //    //})
                //)
            }
        };

        const locationInterval = setInterval(updateLocation, 200000);

        return () => clearInterval(locationInterval);
    }, [driverContextData.driver, activePassenger]);
    useEffect(() => {
            myAllPastRidesDriver()
            .then((data) => {
                if (data.success) {
                    setMyPastRides(data.jsonData);
                }
            })
            .catch((err) => {
                console.log(err);
            })
        }, []);
    return(
        <div className="driver_home_page_bg">
            <Toaster />
            {/*<pre>{JSON.stringify(availabilityStatus, null, `\t`)}</pre>*/}
            {/*<pre>{JSON.stringify({curr:driverContextData.driver?.availabilityStatus}, null, `\t`)}</pre>*/}
            {/*<pre>{JSON.stringify({next:!driverContextData.driver?.availabilityStatus}, null, `\t`)}</pre>*/}
            {/*<pre>{JSON.stringify(isChatPanelActive, null, `\t`)}</pre>*/}
            {/*<img className="logo" src={logo} alt={logo} />*/}
            
            <div className="map_cont" onClick={() => setIsShortcutMenuActive(false)}>
                <LiveTracking />
            </div>
            <MenuButton setIsChatPanelActive={setIsChatPanelActive} setIsMyProfilePanelActive={setIsMyProfilePanelActive} setIsMyPastTripsPanelActive={setIsMyPastTripsPanelActive}
                isShortcutMenuActive={isShortcutMenuActive} setIsShortcutMenuActive={setIsShortcutMenuActive}
             />
             <Panel isPanelActive={homePanelActive} hasRideAcceptedHide={true} onClosePosition="-55%">
                    <ShowHideToggler toggleHandler={() => setHomePanelActive(!homePanelActive)} />

                    <Toggler state={driverContextData.driver?.availabilityStatus as boolean} onClickHandler={updateDriverAvailablityStatusHandler} togglerID="availability_status_inp" />
                    <ProfileShort name={driverContextData.driver?.userID.name as string} amount={2039} />
                    <ShortCuts shortcuts={shortcuts} />
             </Panel>
            {
                newRidesNotifications.map((requestPopup) => (
                    <Panel isPanelActive={isRideRequestPoppedUp.includes(requestPopup._id)}>
                        <Heading text="New ride available" padding="10px" />
                        <ScrollableContainer height="58%">
                            <ProfileShort name={requestPopup.passengerMobile} amount={Math.ceil(requestPopup.distance/1000)} />
                            <Location highlightAddress="Ho.No.371" fullAddress={requestPopup.pickupLocation.address + "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, cupiditate officiis repudiandae beatae veritatis consequatur alias optio fugiat incidunt voluptates debitis necessitatibus ipsa ea natus a facere nulla error eum!"} />
                            <Location highlightAddress="Shop No.24" fullAddress={requestPopup.dropoffLocation.address + "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, cupiditate officiis repudiandae beatae veritatis consequatur alias optio fugiat incidunt voluptates debitis necessitatibus ipsa ea natus a facere nulla error eum!"} />
                        </ScrollableContainer>
                        <Button text="Accept" margin="10px 0" onClickHandler={() => acceptRequestHandler(requestPopup)} />
                        <Button text="Ignore" background="transparent" color="#717171" border={true} onClickHandler={() => ignoreRequestHandler(requestPopup._id)} />
                    </Panel>
                ))
            }
            <Panel isPanelActive={hasRideAccepted} onClosePosition="-70%" onCloseZInd="1" hasRideAcceptedHide={hasRideAcceptedHide}>
                <ShowHideToggler toggleHandler={() => setHasRideAccepted(!hasRideAccepted)} />
                <Heading text="Start ride by OTP" />
                <ScrollableContainer height="60%">
                    <ProfileShort name={acceptedRide?.passengerName as string} amount={acceptedRide?.fare as number} />
                    <SendMessageInput onChangeHandler={(e:ChangeEvent<HTMLInputElement>) => setOtpInp(e.target.value)} onClickHandler={startedRideHandler} />
                    <Location highlightAddress="Ho.No.371" fullAddress={"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit nostrum accusantium minus quisquam ipsa error ex fugiat ratione, quas amet, perspiciatis distinctio ea at tempore provident nemo rem quo dignissimos"+"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit nostrum accusantium minus quisquam ipsa error ex fugiat ratione, quas amet, perspiciatis distinctio ea at tempore provident nemo rem quo dignissimos"+acceptedRide?.pickupLocation.address as string} />
                    <Location highlightAddress="Shop No.24" fullAddress={"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit nostrum accusantium minus quisquam ipsa error ex fugiat ratione, quas amet, perspiciatis distinctio ea at tempore provident nemo rem quo dignissimos"+"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit nostrum accusantium minus quisquam ipsa error ex fugiat ratione, quas amet, perspiciatis distinctio ea at tempore provident nemo rem quo dignissimos"+acceptedRide?.dropoffLocation.address as string} />
                </ScrollableContainer>
                {
                    isOtpValid &&
                        <>
                            <Button text="Go to ride page" margin="10px 0 0 0" onClickHandler={goToRidePageHandler} />
                        </>
                }
                <Button text="Cancel" background="transparent" margin="10px 0" color="red" border={true} onClickHandler={cancelRideHandler} />
            </Panel>
            <ChatPanel isChatPanelActive={isChatPanelActive}
                setIsChatPanelActive={setIsChatPanelActive}
                receiver={acceptedRide?.passengerID as string}
                senderType="driver"
                receiverSocketID={activePassenger?.socketID as string}
                messages={messages}
                setMessages={setMessages}
                myUserID={driverContextData.driver?._id as string}
            />
            <ProfilePanel
                isMyProfilePanelActive={isMyProfilePanelActive}
                setIsMyProfilePanelActive={setIsMyProfilePanelActive}
                profileFor="driver"
                profile={driverContextData.driver as DriverTypesPopulated}
                setProfile={setDriverContextData as Dispatch<SetStateAction<{
                    isLoading: boolean;
                    user?: UserTypes|null;
                    driver?: DriverTypesPopulated|null;
                }>>}
            />

            <Panel isPanelActive={isMyPastTripsPanelActive}>
                <ShowHideToggler toggleHandler={() => setIsMyPastTripsPanelActive(false)} />
                <Heading text="Choose from past trips" padding="10px 0" />
                <ScrollableContainer height="80%">
                    {
                        myPastRides.map((ride) => (
                            <div className="trip_cont">
                                <CarListItem allFare={{
                                    uberAuto:ride.fare,
                                    uberComfort:ride.fare,
                                    uberHCV:ride.fare,
                                    uberMoto:ride.fare,
                                    uberPool:ride.fare,
                                    uberXL:ride.fare,
                                    uberScooty:ride.fare,
                                    uberX:ride.fare
                                }} vehicleCapacity={vehicleCapacity[driverContextData.driver?.vehicleDetailes.vehicleType as VehicleTypeTypes]} vehicleDescription={vehicleDescription[driverContextData.driver?.vehicleDetailes.vehicleType as VehicleTypeTypes]} vehicleImg={vehicleImages[driverContextData.driver?.vehicleDetailes.vehicleType as VehicleTypeTypes]} vehicleType={driverContextData.driver?.vehicleDetailes.vehicleType as VehicleTypeTypes} border="1px solid transparent" />
                                <Location highlightAddress="Ho.No.371" fullAddress={ride.pickupLocation.address} />
                                <Location highlightAddress="Shop No.22" fullAddress={ride.dropoffLocation.address} />
                            </div>

                        ))
                    }
                </ScrollableContainer>
            </Panel>
            


        </div>
    )
};

export default DriverHome;