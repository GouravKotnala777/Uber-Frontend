import "../styles/pages/driver_home.scss";
import map from "../../public/bg-2.jpg";
import logo from "../../public/uber-logo-1.png";
import { useContext, useEffect, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { BiSend, BiStopwatch } from "react-icons/bi";
import { PiSpeedometer } from "react-icons/pi";
import { FiFile } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { acceptRideRequest, myDriverProfile, startRide } from "../api";
import { SocketContextTypes, SocketDataContext } from "../contexts/SocketContext";
import { UserContextTypes, UserDataContext } from "../contexts/UserContext";
import { DriverContextTypes, DriverDataContext } from "../contexts/DriverContext";
import { LocationTypes, RideStatusTypes, UserTypes } from "../utils/types";
import Location from "../components/Location";
import ProfileShort from "../components/ProfileShort";
import ShortCuts from "../components/ShortCuts";

export interface NewRideNotificationTypes {
    _id:string;
    pickupLocation:LocationTypes;
    dropoffLocation:LocationTypes;
    distance:number;
    duration:number;
    fare:number;
    status:RideStatusTypes;
    otp:string;
    passengerName:string;
    passengerEmail:string;
    passengerMobile:string;
    passengerSocketID:string;
    passengerGender:"male"|"female"|"other";
};

const shortcuts = [
    {icon:BiStopwatch, heading:"10.2", subHeading:"patoni"},
    {icon:PiSpeedometer, heading:"30", subHeading:"patoni"},
    {icon:FiFile, heading:"20", subHeading:"patoni"}
];

const DriverHome = () => {
    //const [isLocationPanelActive, setIsLocationPanelActive] = useState<boolean>(true);
    const [isRideRequestPoppedUp, setIsRideRequestPoppedUp] = useState<boolean>(false);
    const [hasRideAccepted, setHasRideAccepted] = useState<boolean>(false);
    const [newRidesNotifications, setNewRidesNotifications] = useState<NewRideNotificationTypes[]>([]);
    const [activePassenger, setActivePassenger] = useState<Pick<UserTypes, "name"|"email"|"mobile"|"socketID">|null>(null);
    const [acceptedRide, setAcceptedRide] = useState<NewRideNotificationTypes|null>(null);
    const [otpInp, setOtpInp] = useState<string>("");
    const [isOtpValid, setIsOtpValid] = useState<boolean>(false);
    const navigate = useNavigate();
    const socketContext = useContext<SocketContextTypes|null>(SocketDataContext);
    const userContext = useContext<UserContextTypes|null>(UserDataContext);
    const driverContext = useContext<DriverContextTypes|null>(DriverDataContext);

    if (!socketContext) throw Error("socketDataContext not provided");
    if (!userContext) throw Error("userDataContext not provided");
    if (!driverContext) throw Error("driverContext not provided");

    //const {user, setUser, updateUser} = userContext;
    const {driver, setDriver} = driverContext;
    const {sendMessage, receiveMessage} = socketContext;



    useEffect(() => {
        myDriverProfile()
        .then((res) => {
            setDriver(res.jsonData);
        }).catch((err) => {
            console.log(err);
        })
    }, []);
    useEffect(() => {
        if (driver) {
            sendMessage("join", {userID:driver?.userID._id as string, userType:"driver"});
        }
    }, [driver]);
    useEffect(() => {
        receiveMessage("new-ride", (data) => {
            console.log("DATADATADATADATADATADATADATADATA (1)");
            console.log(data);
            //const {passengerName, passengerEmail, passengerMobile, passengerGender, passengerSocketID} = (data as NewRideNotificationTypes);
            setNewRidesNotifications((prev) => [...prev, data as NewRideNotificationTypes]);
            setIsRideRequestPoppedUp(true);
            //setActivePassenger({name:passengerName, email:passengerEmail, mobile:passengerMobile, gender:passengerGender, socketID:passengerSocketID});
            console.log("DATADATADATADATADATADATADATADATA (2)");
        })
    }, []);
    useEffect(() => {

        const updateLocation = () => {
            navigator.geolocation.getCurrentPosition(p => {
                console.log(p.coords);
            })
            if (navigator.geolocation) {
                console.log({
                    passengerSocketID:activePassenger?.socketID,
                    driverID:driver?._id as string,
                    eventName:"send-location-to-passenger",
                    location:{
                        ltd:1.2345,
                        lng:2.2345
                    }});
                
                sendMessage("update-driver-location", {
                    message:{
                        passengerSocketID:activePassenger?.socketID,
                        driverID:driver?._id as string,
                        eventName:"send-location-to-passenger",
                        location:{
                            ltd:1.2345,
                            lng:2.2345
                        }
                    }
                })
                
                //navigator.geolocation.getCurrentPosition(position => 
                //    //sendMessage("update-driver-location", {
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

        const locationInterval = setInterval(updateLocation, 20000);

        return () => clearInterval(locationInterval);
    }, [driver, activePassenger]);
    return(
        <div className="driver_home_page_bg">
            {/*<pre>{JSON.stringify(driver?.userID._id, null, `\t`)}</pre>*/}
            {/*<pre>{JSON.stringify(activePassenger, null, `\t`)}</pre>*/}
            <img className="logo" src={logo} alt={logo} />
            <div className="map_cont">
                <img src={map} alt={map} />
            </div>

            <div className="driver_profile_panel_cont">
                    <ProfileShort name={driver?.userID.name as string} amount={2039} />
                    <ShortCuts shortcuts={shortcuts} />
            </div>

            
            <div className="passenger_request_panel_cont_outer" style={{transform:isRideRequestPoppedUp?"translate(0, -195%)":"translate(0, 50%)"}}>
                <button className="show_location_btn" style={{
                    top:isRideRequestPoppedUp?"-20%":"-90%"
                }} onClick={() => setIsRideRequestPoppedUp(!isRideRequestPoppedUp)}><CiLocationOn className="CiLocationOn" /></button>
                {
                    newRidesNotifications.map((requestPopup) => (
                        <div className="passenger_request_panel_cont">
                            <ProfileShort name={requestPopup.passengerMobile} amount={Math.ceil(requestPopup.distance/1000)} />
                            <Location highlightAddress="Ho.No.371" fullAddress={requestPopup.pickupLocation.address} />
                            <Location highlightAddress="Shop No.24" fullAddress={requestPopup.dropoffLocation.address} />
                            <div className="fifth_part">
                                <button className="accept_btn" onClick={() => {
                                    setIsRideRequestPoppedUp(false);
                                    setHasRideAccepted(true);
                                    acceptRideRequest({
                                        rideID:requestPopup._id,
                                        driverID:driver?._id as string,
                                        status:"accepted"});
                                    setActivePassenger({
                                        name:requestPopup.passengerName,
                                        email:requestPopup.passengerEmail,
                                        mobile:requestPopup.passengerMobile,
                                        socketID:requestPopup.passengerSocketID
                                    });
                                    setAcceptedRide(requestPopup);
                                }}>Accept</button>
                                <button className="ignore_btn" onClick={() => setIsRideRequestPoppedUp(false)}>Ignore</button>
                            </div>
                        </div>
                    ))
                }

            </div>
            <div className="passenger_request_panel_cont_outer" style={{transform:hasRideAccepted?"translate(0, -295%)":"translate(0, 50%)"}}>
                <button className="show_location_btn" style={{
                    top:hasRideAccepted?"-20%":"-90%"
                }}><CiLocationOn className="CiLocationOn" /></button>
                <div className="passenger_request_panel_cont">
                    <ProfileShort name={acceptedRide?.passengerName as string} amount={acceptedRide?.fare as number} />
                    <div className="second_part">
                        <div className="input_cont">
                            <input type="text" className="message_inp" placeholder="Enter passenger OTP" onChange={(e) => setOtpInp(e.target.value)} />
                            <button className="send_message_btn" onClick={async() => {
                                const startedRide = await startRide({rideID:acceptedRide?._id as string, otp:otpInp});

                                if (startedRide.success) {
                                    setIsOtpValid(true);
                                }
                            }}><BiSend className="BiSend" /></button>
                        </div>
                    </div>
                    <Location highlightAddress="Ho.No.371" fullAddress={acceptedRide?.pickupLocation.address as string} />
                    <Location highlightAddress="Shop No.24" fullAddress={acceptedRide?.dropoffLocation.address as string} />
                    {
                        isOtpValid &&
                            <div className="fifth_part">
                                <button className="confirm_btn" onClick={() => navigate("/driver/riding")}>Confirm</button>
                                <button className="cancel_btn">Cancel</button>
                            </div>
                    }
                </div>
            </div>


        </div>
    )
};

export default DriverHome;