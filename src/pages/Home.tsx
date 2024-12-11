import "../styles/pages/home.scss";
import map from "../../public/bg-2.jpg";
import logo from "../../public/uber-logo-1.png";
import car from "../../public/car1.png";
import vite from "../../public/vite.svg";
import { useEffect, useState } from "react";
import { BiDownArrow, BiSend } from "react-icons/bi";
import { FaLocationDot, FaLocationPin } from "react-icons/fa6";
import CarListItem from "../components/CarListItem";
import { CiLocationOff, CiLocationOn } from "react-icons/ci";
import { BsCash, BsStarFill } from "react-icons/bs";
import { MdSafetyCheck } from "react-icons/md";
import { IoCall } from "react-icons/io5";
import { getSuggestions, myProfile } from "../api";
import { UserTypes } from "../utils/types";

const Home = () => {
    const [isLocationPanelActive, setIsLocationPanelActive] = useState<boolean>(false);
    const [isRidesPanelActive, setIsRidesPanelActive] = useState<boolean>(false);
    const [isSelectedRidePanelActive, setIsSelectedRidePanelActive] = useState<boolean>(false);
    const [isWaitingPanelActive, setIsWaitingPanelActive] = useState<boolean>(false);
    const [isMeetAtPickupPanelActive, setIsMeetAtPickupPanelActive] = useState<boolean>(false);
    const [pickupLocationInp, setPickupLocationInp] = useState<string>("");
    const [dropoffLocationInp, setDropoffLocationInp] = useState<string>("");
    const [pickupLocation, setPickupLocation] = useState<string>("");
    const [dropoffLocation, setDropoffLocation] = useState<string>("");
    const [pickupLocationSuggestions, setPickupLocationSuggestions] = useState<string[]>([]);
    const [dropoffLocationSuggestions, setDropoffLocationSuggestions] = useState<string[]>([]);


    useEffect(() => {
        const aa = setTimeout(() => {
            setPickupLocation("");
            getSuggestions(pickupLocationInp)
            .then((res) => {
                if (res.success) {                    
                    setPickupLocationSuggestions(res.jsonData.map((q:{description:string}) => q.description));
                }
            })
            .catch((err) => {
                console.log(err);
            })
        }, 2000);

        return () => {clearTimeout(aa)}
    }, [pickupLocationInp]);
    useEffect(() => {        
        const aa = setTimeout(() => {
            setDropoffLocation("");
            getSuggestions(dropoffLocationInp)
            .then((res) => {
                if (res.success) {                    
                    setDropoffLocationSuggestions(res.jsonData.map((q:{description:string}) => q.description));
                }
            })
            .catch((err) => {
                console.log(err);
            })
        }, 2000);

        return () => {clearTimeout(aa)}
    }, [dropoffLocationInp]);

    useEffect(() => {
        myProfile()
        .then((res) => {
        }).catch((err) => {
        });
    }, []);

    return(
        <div className="home_page_background">
            {/*<pre>{JSON.stringify(pickupLocation, null, `\t`)}</pre>
            <pre>{JSON.stringify(dropoffLocation, null, `\t`)}</pre>*/}
            <img className="logo" src={logo} alt={logo} />
            <div className="map_cont">
                <img src={map} alt={map} />
            </div>
            <div className="form_cont" style={{transform:isLocationPanelActive?"translate(0, -70vh)":"translate(0, 0vh)"}}>
                <form>
                    <div className="form_heading">Find a trip <BiDownArrow onClick={() => setIsLocationPanelActive(false)} style={{display:isLocationPanelActive?"block":"none"}} /></div>
                    <input type="text" placeholder="Add a pickup location" onChange={(e) => setPickupLocationInp(e.target.value)} onClick={() => setIsLocationPanelActive(true)} />
                    <input type="text" className="destination_inp" placeholder="Enter your destination" onChange={(e) => setDropoffLocationInp(e.target.value)} onClick={() => setIsLocationPanelActive(true)} />
                </form>
            </div>
            <div className="suggestion_list_cont" style={{transform:isLocationPanelActive?"translate(0, -70vh)":"translate(0, 0vh)", zIndex:isLocationPanelActive?"1":"-1"}}>
                {
                    !pickupLocation&&pickupLocationSuggestions.map((item) => (
                        <div className="searched_pickup_location_cont" key={item} onClick={() => {
                            //if(pickupLocation && dropoffLocation){
                            //}
                            setIsLocationPanelActive(false);
                            setIsRidesPanelActive(true);
                            setPickupLocation(item);
                            }}>
                            <div className="location_icon"><FaLocationDot /></div>
                            <div className="location_detaile">{item}</div>
                        </div>
                    ))
                }
                {
                    !dropoffLocation&&dropoffLocationSuggestions.map((item) => (
                        <div className="searched_pickup_location_cont" key={item} onClick={() => {
                            //if(pickupLocation && dropoffLocation){
                            //}
                            setIsLocationPanelActive(false);
                            setIsRidesPanelActive(true);
                            setDropoffLocation(item);
                            }}>
                            <div className="location_icon"><FaLocationDot /></div>
                            <div className="location_detaile">{item}</div>
                        </div>
                    ))
                }

            </div>
            <div className="rides_list_cont" style={{transform:isRidesPanelActive?"translate(0, -110vh)":"translate(0, 0vh)", zIndex:isRidesPanelActive?"1":"-1"}}>
                <BiDownArrow className="BiDownArrow" onClick={() => setIsRidesPanelActive(false)} style={{display:isRidesPanelActive?"block":"none"}} />
                <div className="rides_list">
                    {
                        [0,1,2,3,4,5,6].map((item) => (
                            <div className="car_list_item_outer" onClick={() => {setIsRidesPanelActive(false); setIsSelectedRidePanelActive(true);}}>
                                <CarListItem key={item} name="Uber CarGo" passengersCapacity={item} away="2 minutes away 15.24" feature="affordable compact" price={193.2} />
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="selected_rides_detail_cont" style={{transform:isSelectedRidePanelActive?"translate(0, -190vh)":"translate(0, 0vh)", zIndex:isSelectedRidePanelActive?"1":"-1"}}>
                <BiDownArrow className="BiDownArrow" onClick={() => setIsSelectedRidePanelActive(false)} style={{display:isSelectedRidePanelActive?"block":"none"}} />
                <div className="selected_ride">
                    <div className="panel_heading">Confirm your Ride</div>
                    <div className="car_icon_cont"><img src={car} alt={car} /></div>
                    <div className="ride_details">
                        <div className="pickup_location_details_cont">
                            <CiLocationOn className="CiLocationOn" />
                            <div className="pickup_location_details">
                                <div className="highlight_info">562/11-A</div>
                                <div className="full_info">Kankariya talab, Bhopal</div>
                            </div>
                        </div>
                        <div className="dropoff_location_details_cont">
                            <CiLocationOff className="CiLocationOff" />
                            <div className="dropoff_location_details">
                                <div className="highlight_info">Ho.No.371</div>
                                <div className="full_info">Ho.No.371, near lal mandir, new bhoor colony, sec-29, old faridabad</div>
                            </div>
                        </div>
                        <div className="price_cont">
                            <BsCash className="BsCash" />
                            <div className="price">
                                ₹ 193.20
                            </div>
                        </div>
                    </div>
                    <button className="confirm_ride" onClick={() => {setIsSelectedRidePanelActive(false); setIsWaitingPanelActive(true);}}>Confirm</button>
                </div>
            </div>
            <div className="waiting_for_driver_cont" style={{transform:isWaitingPanelActive?"translate(0, -270vh)":"translate(0, 0vh)", zIndex:isWaitingPanelActive?"1":"-1"}}>
                <BiDownArrow className="BiDownArrow" onClick={() => setIsWaitingPanelActive(false)} style={{display:isWaitingPanelActive?"block":"none"}} />
                <div className="selected_ride">
                    <div className="panel_heading">Looking For Nearby Drivers...</div>
                    <div className="car_icon_cont"><img src={car} alt={car} /></div>
                    <div className="ride_details">
                        <div className="pickup_location_details_cont">
                            <CiLocationOn className="CiLocationOn" />
                            <div className="pickup_location_details">
                                <div className="highlight_info">562/11-A</div>
                                <div className="full_info">Kankariya talab, Bhopal</div>
                            </div>
                        </div>
                        <div className="dropoff_location_details_cont">
                            <CiLocationOff className="CiLocationOff" />
                            <div className="dropoff_location_details">
                                <div className="highlight_info">Ho.No.371</div>
                                <div className="full_info">Ho.No.371, near lal mandir, new bhoor colony, sec-29, old faridabad</div>
                            </div>
                        </div>
                        <div className="price_cont">
                            <BsCash className="BsCash" />
                            <div className="price" onClick={() => {setIsWaitingPanelActive(false); setIsMeetAtPickupPanelActive(true);}}>
                                ₹ 193.20
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="meet_at_pickup_point_cont" style={{transform:isMeetAtPickupPanelActive?"translate(0, -350vh)":"translate(0, 0vh)", zIndex:isMeetAtPickupPanelActive?"1":"-1"}}>
                <div className="selected_ride">
                    <div className="first_part">
                        <div className="panel_heading">Meet At The Pickup Point</div>
                        <div className="timer">
                            <div className="value">2</div>
                            <div className="unit">min</div>
                        </div>
                    </div>
                    <div className="second_part">
                        <div className="driver_photo"><img src={vite} alt={vite} /></div>
                        <div className="driver_details">
                            <div className="driver_name">SANTH</div>
                            <div className="vehicle_number">KA15AK00-0</div>
                            <div className="vehicle_color">White</div>
                            <div className="vehicle_model">Suzuki S-Presso </div>
                            <div className="driver_ratings"><BsStarFill className="BsStarFill" /><div className="value">4.9</div></div>
                        </div>
                    </div>
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
                    <div className="fifth_part">
                        <div className="pickup_location_details_cont">
                            <CiLocationOn className="CiLocationOn" />
                            <div className="pickup_location_details">
                                <div className="highlight_info">562/11-A</div>
                                <div className="full_info">Kankariya talab, Bhopal</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
};

export default Home;