import "../styles/pages/home.scss";
import logo from "/uber-logo-1.png";
import { Dispatch, MouseEvent, SetStateAction, useContext, useEffect, useState } from "react";
//import { BiUser } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";
import CarListItem from "../components/CarListItem";
import { IoCallOutline } from "react-icons/io5";
import { createRideRequest, getCoordinates, getFareOfTrip, getSuggestions, myAllPastRidesPassenger } from "../api";
import { ChatTypes, DriverTypesPopulated, LocationTypes, RideStatusTypes, RideTypesPopulated, UserTypes, VehicleTypeTypes } from "../utils/types";
import { DriverContextTypes, DriverInitialContextData } from "../contexts/DriverContext";
import { UserContextTypes, UserInitialDataContext } from "../contexts/UserContext";
import { SocketContextTypes, SocketDataContext } from "../contexts/SocketContext";

import uberX from "/uber-x.png";
import uberAuto from "/uber-tuktuk.png";
import uberScooty from "/uber-scooty.png";
import uberMoto from "/uber-moto.png";
import uberComfort from "/uber-comfort.png";
import uberHCV from "/uber-hcv.png";
import uberPool from "/uber-pool.png";
import uberXL from "/uber-xl.png";
import { useNavigate } from "react-router-dom";
import Location from "../components/Location";
import TripFee from "../components/TripFee";
import ProfileLong from "../components/ProfileLong";
import ShortCuts, { ShortcutTypes } from "../components/ShortCuts";
import Button from "../components/Button";
import Input from "../components/Input";
import Heading from "../components/Heading";
import ShowHideToggler from "../components/ShowHideToggler";
import { TbShieldPin } from "react-icons/tb";
import { MdOutlineLocationOn } from "react-icons/md";
import { TiMessages } from "react-icons/ti";
import ChatPanel from "../components/ChatPanel";
import LiveTracking from "../components/LiveTracking";
import ProfilePanel from "../components/ProfilePanel";
import {CenterContainer, Panel, ScrollableContainer} from "../components/WrapperContainers";
import { redirectAfterToast } from "../utils/utilityFunctions";
import { Toaster } from "react-hot-toast";
import MenuButton from "../components/MenuButton";
import { JOIN, NEW_MESSAGE, RIDE_ACCEPTED, RIDE_CANCELLED, RIDE_STARTED, SEND_LOCATION_TO_PASSENGER, VEHICLE_TYPES_ARRAY, vehicleCapacity, vehicleDescription } from "../utils/constants";



export interface RideAcceptedEventMessageType {
    rideID:string;
    status:RideStatusTypes;
    otp:string;
    driverID:string;
    driverName:string;
    driverEmail:string;
    driverMobile:string;
    driverGender:"male"|"female"|"other";
    driverImg?:string;
    driverSocketID:string;
    licenseNumber:string;
    vehicleDetailes:{
        vehicleType:VehicleTypeTypes;
        vehicleModel:string;
        vehicleNumber:string;
        vehicleColor:string;
    };
    rating:string;
};
const shortcuts:ShortcutTypes[]= [
    {icon:TbShieldPin, heading:"Shafety", subHeading:"something"},
    {icon:TiMessages, heading:"Message", subHeading:"chat with driver"},
    {icon:MdOutlineLocationOn, heading:"Share", subHeading:"share my trip"},
    {icon:IoCallOutline, heading:"Call", subHeading:"call my driver"}
];

export const vehicleImages = {uberAuto, uberX, uberMoto, uberScooty, uberComfort, uberHCV, uberPool, uberXL};

const Home = () => {
    const [isLocationPanelActive, setIsLocationPanelActive] = useState<boolean>(false);
    const [isRidesPanelActive, setIsRidesPanelActive] = useState<boolean>(false);
    const [isSelectedRidePanelActive, setIsSelectedRidePanelActive] = useState<boolean>(false);
    const [isWaitingPanelActive, setIsWaitingPanelActive] = useState<boolean>(false);

    const [isMeetAtPickupPanelActive, setIsMeetAtPickupPanelActive] = useState<boolean>(false);
    const [isMeetAtPickupPanelActiveHide, setIsMeetAtPickupPanelActiveHide] = useState<boolean>(false);

    const [isShortcutMenuActive, setIsShortcutMenuActive] = useState<boolean>(false);

    const [isChatPanelActive, setIsChatPanelActive] = useState<boolean>(false);
    const [isMyProfilePanelActive, setIsMyProfilePanelActive] = useState<boolean>(false);
    const [isMyPastTripsPanelActive, setIsMyPastTripsPanelActive] = useState<boolean>(false);
    const [pickupLocationInp, setPickupLocationInp] = useState<string>("");
    const [dropoffLocationInp, setDropoffLocationInp] = useState<string>("");
    const [pickupLocation, setPickupLocation] = useState<LocationTypes>({
        latitude: 28.4339049,
        longitude: 77.3223915,
        address: "Sector 29, Faridabad, Haryana, India"
    });
    const [dropoffLocation, setDropoffLocation] = useState<LocationTypes>({
        latitude:28.4354267,
        longitude:77.3143303,
        address:"Sector 28, Faridabad, Haryana, India"
    });
    //const [pickupLocation, setPickupLocation] = useState<LocationTypes>({latitude:0, longitude:0, address:""});
    //const [dropoffLocation, setDropoffLocation] = useState<LocationTypes>({latitude:0, longitude:0, address:""});
    const [pickupLocationSuggestions, setPickupLocationSuggestions] = useState<string[]>([]);
    const [dropoffLocationSuggestions, setDropoffLocationSuggestions] = useState<string[]>([]);
    const [allFare, setAllFare] = useState<{[P in VehicleTypeTypes]:number;}>({uberAuto:0 ,uberX:0 ,uberMoto:0 ,uberScooty:0 ,uberComfort:0 ,uberHCV:0 ,uberPool:0 , uberXL:0});
    const [selectedVehicleType, setSelectedVehicleType] = useState<VehicleTypeTypes>("uberX");
    const [activeDriver, setActiveDriver] = useState<RideAcceptedEventMessageType|null>(null);
    const [myPastRides, setMyPastRides] = useState<RideTypesPopulated[]>([]);
    const [isMySavedRidesActive, setIsMySavedRidesActive] = useState<boolean>(false);
    const [messages, setMessages] = useState<ChatTypes[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    //const [newChatNotification, setNewChatNotification] = useState<number>(0);
    const driverContext = useContext<DriverContextTypes>(DriverInitialContextData);
    const userContext = useContext<UserContextTypes>(UserInitialDataContext);
    const socketContext = useContext<SocketContextTypes|null>(SocketDataContext);
    const navigate = useNavigate();

    

    //const shortcuts:ShortcutTypes[]= [
    //    {icon:TbShieldPin, heading:"Shafety", subHeading:"something"},
    //    {icon:TiMessages, heading:"Message", subHeading:"chat with driver"},
    //    {icon:MdOutlineLocationOn, heading:"Share", subHeading:"share my trip"},
    //    {icon:IoCallOutline, heading:"Call", subHeading:"call my driver"}
    //];


    if (!driverContext) {
        // Handle the case where the context is null
        throw new Error("DriverInitialContextData is not provided!");
    }
    if (!userContext) {
        // Handle the case where the context is null
        throw new Error("UserDataContext is not provided!");
    }
    if (!socketContext) {
        // Handle the case where the context is null
        throw new Error("SocketDataContext is not provided!");
    }

    //const { driver, setDriver, updateDriver } = driverContext;
    const {userContextData, setUserContextData} = userContext;
    const {sendMessage, receiveMessage} = socketContext;

    const getCoordinatesByAddress = async({address}:{address:string}):Promise<{ltd:number; lng:number;}> => {
        const res = await getCoordinates({address});

        console.log("====================== (1)");
        console.log({res});
        console.log("====================== (2)");
        return res.jsonData;
    };

    const createRideHandler = (e:MouseEvent<HTMLButtonElement>) => {
        setIsLoading(true);
        e.preventDefault();
        getFareOfTrip({pickupLocation:pickupLocation.address, dropoffLocation:dropoffLocation.address})
        .then((res) => {
            setAllFare(res.jsonData.fare);
            setIsLoading(false);
            setIsLocationPanelActive(false);
            setIsRidesPanelActive(true);
        })
        .catch((err) => {
            console.log(err);
            setIsLoading(false);
        });
    };
    const confirmRideHandler = () => {
        setIsLoading(true);
        createRideRequest({passengerID:userContextData.user?._id as string, pickupLocation, dropoffLocation, vehicleType:selectedVehicleType})
        .then(() => {
            setIsLoading(false);
            setIsSelectedRidePanelActive(false);
            setIsWaitingPanelActive(true);
            
        })
        .catch((err) => {
            console.log(err);
            setIsLoading(false);
        });
    };

    useEffect(() => {
        const aa = setTimeout(() => {
            //---------------------------------------setPickupLocation({address:"", latitude:0, longitude:0});
            if (pickupLocationInp.trim() !== "") {                
                getSuggestions(pickupLocationInp)
                .then((res) => {
                    if (res.success) {                    
                        setPickupLocationSuggestions(res.jsonData.map((q:{description:string}) => q.description));
                        setPickupLocationInp("");
                        //allNearbyDrivers({radius:"10", address:"Sector 29, Faridabad, Haryana, India"})
                        //.then((allNearDriversRes) => {
                        //    setAllNearByDrivers(allNearDriversRes.jsonData);
                        //})
                        //.catch((err) => {
                        //    setAllNearByDrivers(err);
                        //});
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
            }
        }, 2000);

        return () => {clearTimeout(aa)}
    }, [pickupLocationInp]);
    useEffect(() => {
        
        const aa = setTimeout(() => {
            //-------------------------------------------setDropoffLocation({address:"", latitude:0, longitude:0});
            if (dropoffLocationInp.trim() !== "") {
                getSuggestions(dropoffLocationInp)
                .then((res) => {
                    if (res.success) {                    
                    setDropoffLocationSuggestions(res.jsonData.map((q:{description:string}) => q.description));
                    setDropoffLocationInp("");
                }
                })
                .catch((err) => {
                    console.log(err);
                })
            }
        }, 2000);

        return () => {clearTimeout(aa)}
    }, [dropoffLocationInp]);

    useEffect(() => {
        if (userContextData.user) {
            sendMessage(JOIN, {userID:userContextData.user?._id as string, userType:userContextData.user?.role as "user"|"driver"|"admin"});
        }
    }, [userContextData.user]);
    useEffect(() => {
        receiveMessage(SEND_LOCATION_TO_PASSENGER, (data) => {
            console.log("SSSSSSSSSSSSSSSSSSSSSSSS (1)");
            console.log(data);
            console.log("SSSSSSSSSSSSSSSSSSSSSSSS (2)");
        });
    }, []);
    useEffect(() => {
        receiveMessage(RIDE_ACCEPTED, (data) => {
            console.log("DDDDDDDDDDDDDDDDDDDDDDDDDD (1)");
            console.log(data);
            setActiveDriver(data as RideAcceptedEventMessageType);
            setIsWaitingPanelActive(false);
            setIsMeetAtPickupPanelActive(true);
            setIsMeetAtPickupPanelActiveHide(true);
            console.log("DDDDDDDDDDDDDDDDDDDDDDDDDD (2)");
        });
    }, []);
    useEffect(() => {
        if (activeDriver) {
            receiveMessage(RIDE_STARTED, (data) => {
                console.log("EEEEEEEEEEEEEEEEEEE (1)");
                console.log(data);
                console.log("EEEEEEEEEEEEEEEEEEE (2)");
                navigate("/user/riding", {state:{activeDriver:{...activeDriver, otp:""}, dropoffLocation}})
            });
        }
    }, [activeDriver]);
    useEffect(() => {
        receiveMessage(RIDE_CANCELLED, (data) => {
            console.log("RIDE cancelled Ride cancelled (1)");
            console.log("RIDE cancelled Ride cancelled (1)");
            console.log(data as {data:{rideID:string}});
            console.log("RIDE cancelled Ride cancelled (2)");
            console.log("RIDE cancelled Ride cancelled (2)");
            redirectAfterToast({res:{success:false, message:"Driver cancelled ride", jsonData:{}}, redirectWithReload:"/user/home"});
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
        myAllPastRidesPassenger()
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
        <div className="home_page_background">
            <Toaster />
            {/*<pre>{JSON.stringify(pickupLocation, null, `\t`)}</pre>*/}
            {/*<pre>{JSON.stringify(dropoffLocation, null, `\t`)}</pre>*/}
            {/*<pre>{JSON.stringify(activeDriver, null, `\t`)}</pre>*/}
            {/*<pre>{JSON.stringify(allNearByDrivers.map((item) => item.vehicleDetailes.vehicleType), null, `\t`)}</pre>*/}
            <img className="logo" src={logo} alt={logo} />
            <div className="map_cont" onClick={() => setIsShortcutMenuActive(false)}>
                <LiveTracking />
                {/*<img src={map} alt={map} />*/}
            </div>


            <MenuButton setIsChatPanelActive={setIsChatPanelActive} setIsMyProfilePanelActive={setIsMyProfilePanelActive} setIsMyPastTripsPanelActive={setIsMyPastTripsPanelActive}
                isShortcutMenuActive={isShortcutMenuActive} setIsShortcutMenuActive={setIsShortcutMenuActive}
             />
            <div className="form_cont"
            style={{bottom:isLocationPanelActive?"56%":"0"}}
            onClick={() => setIsShortcutMenuActive(false)}
            >
                <ShowHideToggler hide={!isLocationPanelActive} toggleHandler={() => setIsLocationPanelActive(false)} />
                <div className="heading_and_btn">
                    <Heading text="Find a trip" />
                    <button className="show_saved_rides_btn" onClick={() => setIsMySavedRidesActive(true)}>show</button>
                </div>
                <Input placeholder="Add a pickup location"
                    margin="15px 0 0 0"
                    onChangeHandler={(e) => setPickupLocationInp(e.target.value)}
                    onClickHandler={() => setIsLocationPanelActive(true)}
                        />
                <Input placeholder="Enter your destination"
                    margin="15px 0 0 0"
                    onChangeHandler={(e) => setDropoffLocationInp(e.target.value)}
                    onClickHandler={() => setIsLocationPanelActive(true)}
                        />
                <Button text="Create ride" isLoading={isLoading} margin="15px 0 0 0" onClickHandler={(e) => createRideHandler(e)} />
            </div>
            <div className="suggestion_list_cont"
            style={{bottom:isLocationPanelActive?"0":"-60%", zIndex:isLocationPanelActive?"1":"-1"}}
            onClick={() => setIsShortcutMenuActive(false)}
            >
                {
                    !pickupLocation.address&&pickupLocationSuggestions.map((address) => (
                        <div className="searched_pickup_location_cont" key={address} onClick={async() => {
                            //if(pickupLocation && dropoffLocation){
                            //}
                            //setIsLocationPanelActive(false);
                            //setIsRidesPanelActive(true);
                            const {ltd, lng} = await getCoordinatesByAddress({address});
                            setPickupLocation({latitude:ltd, longitude:lng, address});
                            }}>
                            <div className="location_icon"><FaLocationDot /></div>
                            <div className="location_detaile">{address}</div>
                        </div>
                    ))
                }
                {
                    !dropoffLocation.address&&dropoffLocationSuggestions.map((address) => (
                        <div className="searched_pickup_location_cont" key={address} onClick={async() => {
                            //if(pickupLocation && dropoffLocation){
                            //}
                            const {ltd, lng} = await getCoordinatesByAddress({address});
                            setDropoffLocation({latitude:ltd, longitude:lng, address});
                            }}>
                            <div className="location_icon"><FaLocationDot /></div>
                            <div className="location_detaile">{address}</div>
                        </div>
                    ))
                }

            </div>
            <Panel isPanelActive={isMySavedRidesActive}>
                <ShowHideToggler toggleHandler={() => setIsMySavedRidesActive(false)} />
                <Heading text="Saved rides" />
                <ScrollableContainer height="70%">
                    <h1>sadafsfsdf</h1>
                </ScrollableContainer>
            </Panel>
            <Panel isPanelActive={isRidesPanelActive}>
                <ShowHideToggler hide={!isRidesPanelActive} toggleHandler={() => setIsRidesPanelActive(false)} />
                <Heading text="Choose vehicle type" />
                <ScrollableContainer height="85%">
                        {
                            VEHICLE_TYPES_ARRAY.map((item) => (
                                <div className="car_list_item_outer" onClick={() => {
                                    setIsRidesPanelActive(false);
                                    setIsSelectedRidePanelActive(true);
                                    setSelectedVehicleType(item);
                                }}>
                                    <CarListItem vehicleType={item} allFare={allFare} vehicleDescription={vehicleDescription[item]} vehicleCapacity={vehicleCapacity[item]} vehicleImg={vehicleImages[item]} />
                                    {/*<CarListItem vehicleDetails={item} allFare={allFare} />*/}
                                </div>
                            ))
                        }
                        {
                            //allNearByDrivers.map((item) => (
                            //    <div className="car_list_item_outer" onClick={() => {
                            //        setIsRidesPanelActive(false);
                            //        setIsSelectedRidePanelActive(true);
                            //        setSsss(item);
                            //        setDriver(item);
                            //    }}>
                            //        <CarListItem vehicleDetails={item} allFare={allFare} />
                            //    </div>
                            //))
                        }
                </ScrollableContainer>
            </Panel>
            <Panel isPanelActive={isSelectedRidePanelActive} >
                {/*<div className="selected_rides_detail_cont" style={{transform:isSelectedRidePanelActive?"translate(0, -210vh)":"translate(0, 0vh)", zIndex:isSelectedRidePanelActive?"1":"-1"}}>*/}
                    <ShowHideToggler hide={!isSelectedRidePanelActive} toggleHandler={() => {setIsRidesPanelActive(true); setIsSelectedRidePanelActive(false);}} />
                    <Heading text="Confirm your ride" />
                    <ScrollableContainer height="60%">
                        <CenterContainer>
                            <img src={vehicleImages[selectedVehicleType]} alt={vehicleImages[selectedVehicleType]} />
                        </CenterContainer>
                        <Location highlightAddress="Ho.No.371" fullAddress={pickupLocation.address} />
                        <Location highlightAddress="Shop No. 24" fullAddress={dropoffLocation.address} />
                        <TripFee amount={allFare[selectedVehicleType]} />
                    </ScrollableContainer>
                    <Button text={`Confirm with ${selectedVehicleType}`} isLoading={isLoading} margin="10px 0 0 0" onClickHandler={confirmRideHandler} />
                {/*</div>*/}
            </Panel>
            <Panel isPanelActive={isWaitingPanelActive}>
                <ShowHideToggler hide={!isWaitingPanelActive} toggleHandler={() => setIsWaitingPanelActive(false)} />
                <Heading text="Looking For Nearby Drivers..." />
                <ScrollableContainer height="80%">
                    <CenterContainer>
                        <img src={vehicleImages[selectedVehicleType]} alt={vehicleImages[selectedVehicleType]} />
                    </CenterContainer>
                    <Location highlightAddress="Ho.No.371" fullAddress={pickupLocation.address} />
                    <Location highlightAddress="Shop No. 24" fullAddress={dropoffLocation.address} />
                    <TripFee amount={allFare[selectedVehicleType]} />
                </ScrollableContainer>
            </Panel>
            <Panel isPanelActive={isMeetAtPickupPanelActive} onClosePosition="-36%" onCloseZInd="1" hasRideAcceptedHide={isMeetAtPickupPanelActiveHide}>
                <ShowHideToggler toggleHandler={() => setIsMeetAtPickupPanelActive(!isMeetAtPickupPanelActive)} />
                <div className="first_part">
                    <Heading padding="0 0 10px 0" text="Meet At The Pickup Point" />
                    <div className="timer">
                        <div className="value">2</div>
                        <div className="unit">min</div>
                    </div>
                </div>
                <ScrollableContainer height="81%">
                    <ProfileLong driverDetails={activeDriver as RideAcceptedEventMessageType} />
                    <ShortCuts shortcuts={shortcuts} />
                    <Location highlightAddress="Ho.No.371" fullAddress={pickupLocation.address} />
                </ScrollableContainer>
            </Panel>

            <ChatPanel isChatPanelActive={isChatPanelActive}
                setIsChatPanelActive={setIsChatPanelActive}
                receiver={activeDriver?.driverID as string}
                senderType="user"
                receiverSocketID={activeDriver?.driverSocketID as string}
                messages={messages}
                setMessages={setMessages}
                myUserID={userContextData.user?._id as string}
            />

            <ProfilePanel
                isMyProfilePanelActive={isMyProfilePanelActive}
                setIsMyProfilePanelActive={setIsMyProfilePanelActive}
                profileFor="passenger"
                profile={userContextData.user as UserTypes}
                setProfile={setUserContextData as Dispatch<SetStateAction<{
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
                            <div className="trip_cont" onClick={(e:MouseEvent<HTMLDivElement>) => {
                                    e.preventDefault();
                                    setIsMyPastTripsPanelActive(false);
                                    setSelectedVehicleType(ride.driverID.vehicleDetailes.vehicleType);
                                    setIsWaitingPanelActive(true);
                                    createRideRequest({passengerID:ride.passengerID as string, pickupLocation:ride.pickupLocation, dropoffLocation:ride.dropoffLocation, vehicleType:ride.driverID.vehicleDetailes.vehicleType});                        
                            }}>
                                <CarListItem allFare={{
                                    uberAuto:ride.fare,
                                    uberComfort:ride.fare,
                                    uberHCV:ride.fare,
                                    uberMoto:ride.fare,
                                    uberPool:ride.fare,
                                    uberXL:ride.fare,
                                    uberScooty:ride.fare,
                                    uberX:ride.fare
                                }} vehicleCapacity={vehicleCapacity[ride.driverID.vehicleDetailes.vehicleType]} vehicleDescription={vehicleDescription[ride.driverID.vehicleDetailes.vehicleType]} vehicleImg={vehicleImages[ride.driverID.vehicleDetailes?.vehicleType]} vehicleType={ride.driverID.vehicleDetailes?.vehicleType} border="1px solid transparent" />
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

export default Home;