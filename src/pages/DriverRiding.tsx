import { CiLocationOff, CiLocationOn } from "react-icons/ci";
import "../styles/pages/driver_riding.scss";
import { useState } from "react";
import vite from "../../public/vite.svg";
import { BiSend } from "react-icons/bi";
import { NewRideNotificationTypes } from "./DriverHome";
import { BsArrowDownSquare, BsArrowUp } from "react-icons/bs";

const activeRide:NewRideNotificationTypes = {
    _id:'aaaaaaaaaaaaaaaa',
    pickupLocation:{latitude:1.123, longitude:2.345, address:"aaaaa"},
    dropoffLocation:{latitude:1.123, longitude:2.345, address:"aaaaa"},
    fare:69,
    otp:"",
    passengerEmail:"passenger@gmail.com",
    passengerName:"pasengerName",
    passengerGender:"male",
    passengerMobile:"8882732859",
    passengerSocketID:"aaaaaaaaa",
    status:"in-progress",
    distance:3,
    duration:2,
};

const DriverRiding = () => {
    const [isRideDetailsHide, setisRideDetailsHide] = useState<boolean>(true);

    return(
        <div className="driver_riding_page_bg">
            <div className="map_cont"></div>
            <div className="riding_detail_panel_cont">
                <div className="show_btn_cont">
                    <BsArrowUp className="BsArrowUp" onClick={() => setisRideDetailsHide(false)} />
                </div>
                <div className="riding_detail_panel_heading">
                    You are riding now
                </div>
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
                <button className="show_location_btn"><BsArrowDownSquare className="CiLocationOn" onClick={() => setisRideDetailsHide(true)}/></button>
                <div className="passenger_request_panel_cont">
                    <div className="first_part">
                        <div className="passenger_image"><img src={vite} alt={vite} /></div>
                        <div className="name">
                            <div className="value">{activeRide.passengerName}</div>
                            <div className="btns">
                                <button className="apple_pay_btn">ApplePay</button>
                                <button className="discount_btn">Discount</button>
                            </div>
                        </div>
                        <div className="price">
                            <div className="value">₹{activeRide?.fare}.00</div>
                            <div className="distance">{activeRide?.distance}km</div>
                        </div>
                    </div>
                    <div className="third_part">
                        <div className="pickup_location_details_cont">
                            <CiLocationOn className="CiLocationOn" />
                            <div className="pickup_location_details">
                                <div className="highlight_info">562/11-A</div>
                                <div className="full_info">{activeRide?.pickupLocation.address}</div>
                            </div>
                        </div>
                    </div>
                    <div className="fourth_part">
                        <div className="dropoff_location_details_cont">
                            <CiLocationOff className="CiLocationOff" />
                            <div className="dropoff_location_details">
                                <div className="highlight_info">Ho.No.371</div>
                                <div className="full_info">{activeRide?.dropoffLocation.address}</div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="fifth_part">
                        <button className="confirm_btn">End Ride</button>
                        <button className="cancel_btn">Hide</button>
                    </div>
                    
                </div>
            </div>
        </div>
    )
};

export default DriverRiding;