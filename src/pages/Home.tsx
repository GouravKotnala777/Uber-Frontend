import "../styles/pages/home.scss";
import map from "../../public/bg-2.jpg";
import logo from "../../public/uber-logo-1.png";
import { useContext, useEffect, useState } from "react";
import { BiDownArrow, BiSend } from "react-icons/bi";
import { FaLocationDot, FaLocationPin } from "react-icons/fa6";
import CarListItem from "../components/CarListItem";
import { MdSafetyCheck } from "react-icons/md";
import { IoCall } from "react-icons/io5";
import { createRideRequest, getCoordinates, getFareOfTrip, getSuggestions, myProfile } from "../api";
import { LocationTypes, RideStatusTypes, VehicleTypeTypes } from "../utils/types";
import { DriverContextTypes, DriverDataContext } from "../contexts/DriverContext";
import { UserContextTypes, UserDataContext } from "../contexts/UserContext";
import { SocketContextTypes, SocketDataContext } from "../contexts/SocketContext";

import uberX from "../../public/uber-x.png";
import uberAuto from "../../public/uber-tuktuk.png";
import uberScooty from "../../public/uber-scooty.png";
import uberMoto from "../../public/uber-moto.png";
import uberComfort from "../../public/uber-comfort.png";
import uberHCV from "../../public/uber-hcv.png";
import uberPool from "../../public/uber-pool.png";
import uberXL from "../../public/uber-xl.png";
import { useNavigate } from "react-router-dom";
import Location from "../components/Location";
import TripFee from "../components/TripFee";
import ProfileLong from "../components/ProfileLong";



export interface RideAcceptedEventMessageType {
    status:RideStatusTypes;
    otp:string;
    driverName:string;
    driverEmail:string;
    driverMobile:string;
    driverGender:"male"|"female"|"other";
    licenseNumber:string;
    vehicleDetailes:{
        vehicleType:VehicleTypeTypes;
        vehicleModel:string;
        vehicleNumber:string;
        vehicleColor:string;
    };
    rating:string;
};

export const vehicleImages = {uberAuto, uberX, uberMoto, uberScooty, uberComfort, uberHCV, uberPool, uberXL};
const vehicleDescription = { uberAuto: "Affordable three-wheeler",
    uberX: "Affordable compact",
    uberScooty: "Quick and economical two-wheeler",
    uberMoto: "Convenient and fast bike ride",
    uberComfort: "Premium comfort and space",
    uberHCV: "Heavy commercial vehicle for goods",
    uberPool: "Shared ride for lower cost",
    uberXL: "Spacious ride for groups or large luggage"
};
const vehicleCapacity = {uberAuto:5, uberX:3, uberMoto:1, uberScooty:1, uberComfort:3, uberHCV:5, uberPool:3, uberXL:4};


const Home = () => {
    const [isLocationPanelActive, setIsLocationPanelActive] = useState<boolean>(false);
    const [isRidesPanelActive, setIsRidesPanelActive] = useState<boolean>(false);
    const [isSelectedRidePanelActive, setIsSelectedRidePanelActive] = useState<boolean>(false);
    const [isWaitingPanelActive, setIsWaitingPanelActive] = useState<boolean>(false);
    const [isMeetAtPickupPanelActive, setIsMeetAtPickupPanelActive] = useState<boolean>(false);
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
    const driverContext = useContext<DriverContextTypes|null>(DriverDataContext);
    const userContext = useContext<UserContextTypes|null>(UserDataContext);
    const socketContext = useContext<SocketContextTypes|null>(SocketDataContext);
    const navigate = useNavigate();


    if (!driverContext) {
        // Handle the case where the context is null
        throw new Error("DriverDataContext is not provided!");
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
    const {user, setUser} = userContext;
    const {sendMessage, receiveMessage} = socketContext;

    const getCoordinatesByAddress = async({address}:{address:string}):Promise<{ltd:number; lng:number;}> => {
        const res = await getCoordinates({address});

        console.log("====================== (1)");
        console.log({res});
        console.log("====================== (2)");
        return res.jsonData;
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
        myProfile()
        .then((res) => {
            setUser(res.jsonData);
        }).catch((err) => {
            console.log(err);
        });
    }, []);
    useEffect(() => {
        if (user) {
            sendMessage("join", {userID:user?._id as string, userType:user?.role as "user"|"driver"|"admin"});
        }
    }, [user]);
    useEffect(() => {
        receiveMessage("send-location-to-passenger", (data) => {
            console.log("SSSSSSSSSSSSSSSSSSSSSSSS (1)");
            console.log(data);
            console.log("SSSSSSSSSSSSSSSSSSSSSSSS (2)");
        });
    }, []);
    useEffect(() => {
        receiveMessage("ride-accepted", (data) => {
            console.log("DDDDDDDDDDDDDDDDDDDDDDDDDD (1)");
            console.log(data);
            setActiveDriver(data as RideAcceptedEventMessageType);
            setIsWaitingPanelActive(false);
            setIsMeetAtPickupPanelActive(true);
            console.log("DDDDDDDDDDDDDDDDDDDDDDDDDD (2)");
        });
    }, []);
    useEffect(() => {
        if (activeDriver) {
            receiveMessage("ride-started", (data) => {
                console.log("EEEEEEEEEEEEEEEEEEE (1)");
                console.log(data);
                console.log("EEEEEEEEEEEEEEEEEEE (2)");
                navigate("/user/riding", {state:{activeDriver, dropoffLocation}})
            });
        }
    }, [activeDriver]);

    return(
        <div className="home_page_background">
            {/*<pre>{JSON.stringify(pickupLocation, null, `\t`)}</pre>*/}
            {/*<pre>{JSON.stringify(dropoffLocation, null, `\t`)}</pre>*/}
            {/*<pre>{JSON.stringify(activeDriver, null, `\t`)}</pre>*/}
            {/*<pre>{JSON.stringify(allNearByDrivers.map((item) => item.vehicleDetailes.vehicleType), null, `\t`)}</pre>*/}
            <img className="logo" src={logo} alt={logo} />
            <div className="map_cont">
                <img src={map} alt={map} />
            </div>
            <div className="form_cont" style={{transform:isLocationPanelActive?"translate(0, -60vh)":"translate(0, 0vh)"}}>
                <form>
                    <div className="form_heading">Find a trip <BiDownArrow onClick={() => setIsLocationPanelActive(false)} style={{display:isLocationPanelActive?"block":"none"}} /></div>
                    <input type="text" placeholder="Add a pickup location" onChange={(e) => setPickupLocationInp(e.target.value)} onClick={() => setIsLocationPanelActive(true)} />
                    <input type="text" className="destination_inp" placeholder="Enter your destination" onChange={(e) => setDropoffLocationInp(e.target.value)} onClick={() => setIsLocationPanelActive(true)} />
                    <button className="create_ride_btn" onClick={(e) => {
                        e.preventDefault();
                        setIsLocationPanelActive(false);
                        setIsRidesPanelActive(true);
                        getFareOfTrip({pickupLocation:pickupLocation.address, dropoffLocation:dropoffLocation.address})
                        .then((res) => {
                            setAllFare(res.jsonData.fare);
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                    }}>Create Ride</button>
                </form>
            </div>
            <div className="suggestion_list_cont" style={{transform:isLocationPanelActive?"translate(0, -70vh)":"translate(0, 0vh)", zIndex:isLocationPanelActive?"1":"-1"}}>
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
            <div className="rides_list_cont" style={{transform:isRidesPanelActive?"translate(0, -130vh)":"translate(0, 0vh)", zIndex:isRidesPanelActive?"1":"-1"}}>
                <BiDownArrow className="BiDownArrow" onClick={() => setIsRidesPanelActive(false)} style={{display:isRidesPanelActive?"block":"none"}} />
                <div className="rides_list">
                    {
                        (["uberX", "uberComfort", "uberXL", "uberPool", "uberMoto", "uberScooty","uberAuto", "uberHCV"] as VehicleTypeTypes[]).map((item) => (
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
                </div>
            </div>
            <div className="selected_rides_detail_cont" style={{transform:isSelectedRidePanelActive?"translate(0, -210vh)":"translate(0, 0vh)", zIndex:isSelectedRidePanelActive?"1":"-1"}}>
                <BiDownArrow className="BiDownArrow" onClick={() => {setIsRidesPanelActive(true); setIsSelectedRidePanelActive(false);}} style={{display:isSelectedRidePanelActive?"block":"none"}} />
                <div className="selected_ride">
                    <div className="panel_heading">Confirm your Ride</div>
                    <div className="car_icon_cont"><img src={vehicleImages[selectedVehicleType]} alt={vehicleImages[selectedVehicleType]} /></div>
                    <div className="ride_details">
                        <Location highlightAddress="Ho.No.371" fullAddress={pickupLocation.address} />
                        <Location highlightAddress="Shop No. 24" fullAddress={dropoffLocation.address} />
                        <TripFee amount={allFare[selectedVehicleType]} />
                    </div>
                    <button className="confirm_ride" onClick={() => {
                        setIsSelectedRidePanelActive(false);
                        setIsWaitingPanelActive(true);
                        createRideRequest({passengerID:user?._id as string, pickupLocation, dropoffLocation, vehicleType:selectedVehicleType});
                        }}>Confirm with {selectedVehicleType}</button>
                </div>
            </div>
            <div className="waiting_for_driver_cont" style={{transform:isWaitingPanelActive?"translate(0, -290vh)":"translate(0, 0vh)", zIndex:isWaitingPanelActive?"1":"-1"}}>
                <BiDownArrow className="BiDownArrow" onClick={() => setIsWaitingPanelActive(false)} style={{display:isWaitingPanelActive?"block":"none"}} />
                <div className="selected_ride">
                    <div className="panel_heading">Looking For Nearby Drivers...</div>
                    <div className="car_icon_cont"><img src={vehicleImages[selectedVehicleType]} alt={vehicleImages[selectedVehicleType]} /></div>
                    <div className="ride_details">
                        <Location highlightAddress="Ho.No.371" fullAddress={pickupLocation.address} />
                        <Location highlightAddress="Shop No. 24" fullAddress={dropoffLocation.address} />
                        <TripFee amount={allFare[selectedVehicleType]} />
                    </div>
                </div>
            </div>
            <div className="meet_at_pickup_point_cont" style={{transform:isMeetAtPickupPanelActive?"translate(0, -370vh)":"translate(0, 0vh)", zIndex:isMeetAtPickupPanelActive?"1":"-1"}}>
                <div className="selected_ride">
                    <div className="first_part">
                        <div className="panel_heading">Meet At The Pickup Point</div>
                        <div className="timer">
                            <div className="value">2</div>
                            <div className="unit">min</div>
                        </div>
                    </div>
                    <ProfileLong driverDetails={activeDriver as RideAcceptedEventMessageType} />
                    <div className="third_part">
                        <div className="input_cont">
                            <input type="text" className="message_inp" placeholder="Send a message..." />
                            <button className="send_message_btn"><BiSend className="BiSend" /></button>
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
                    <Location highlightAddress="Ho.No.371" fullAddress={pickupLocation.address} />
                </div>
            </div>

        </div>
    )
};

export default Home;