import { CiLocationOff, CiLocationOn } from "react-icons/ci";
import "../styles/pages/single_ride.scss";
import vite from "../../public/vite.svg";
import { MdDelete } from "react-icons/md";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import { BiMessage } from "react-icons/bi";


const SingleRide = () => {

    return(
        <div className="single_ride_page_bg">
            <div className="nav_btn_cont">
                <button className="back_btn"><FaArrowLeftLong className="FaArrowLeftLong" /></button>
            </div>
            <div className="single_ride_page_scrollable">
                <div className="first_part">
                    <div className="passenger_image"><img src={vite} alt={vite} /></div>
                    <div className="name">
                        <div className="value">Esther Berry</div>
                        <div className="btns">
                            <button className="apple_pay_btn">ApplePay</button>
                            <button className="discount_btn">Discount</button>
                        </div>
                    </div>
                    <div className="price">
                        <div className="value">₹25.00</div>
                        <div className="distance">2.2km</div>
                    </div>
                </div>
                <div className="second_part">
                    <div className="pickup_location_details_cont">
                        <CiLocationOn className="CiLocationOn" />
                        <div className="pickup_location_details">
                            <div className="highlight_info">562/11-A</div>
                            <div className="full_info">Kankariya talab, Bhopal</div>
                        </div>
                    </div>
                </div>
                <div className="third_part">
                    <div className="dropoff_location_details_cont">
                        <CiLocationOff className="CiLocationOff" />
                        <div className="dropoff_location_details">
                            <div className="highlight_info">Ho.No.371</div>
                            <div className="full_info">Ho.No.371, near lal mandir, new bhoor colony, sec-29, old faridabad</div>
                        </div>
                    </div>
                </div>
                <div className="fourth_part">
                    <div className="heading">Pathoni</div>
                    <div className="value">Lorem ipsum dolor sit amet consectetur adipisicing elit. At beatae mollitia in vel. Aperiam beatae molestiae dolor maxime optio! Minima corrupti et ipsum quos veritatis aspernatur fuga vel similique ullam?</div>
                </div>
                <div className="fifth_part">
                    <div className="heading">Pathoni</div>
                    <div className="payment_detail">
                        <div className="heading">Apple Pay</div>
                        <div className="value">₹11.00</div>
                    </div>
                    <div className="payment_detail">
                        <div className="heading">Discount</div>
                        <div className="value">₹11.00</div>
                    </div>
                    <div className="payment_detail">
                        <div className="heading">Paid Amount</div>
                        <div className="value">₹22.00</div>
                    </div>
                </div>
                <div className="sixth_part">
                    <div className="safety_cont">
                        <div className="safety_icon"><IoCall className="MdSafetyCheck" /> </div>
                        <div className="safety_heading">Call</div>
                    </div>
                    <div className="share_my_trip_cont">
                        <div className="share_my_trip_icon"><BiMessage className="FaLocationPin" /></div>
                        <div className="share_my_trip_heading">Message</div>
                    </div>
                    <div className="call_driver_cont">
                        <div className="call_driver_icon"><MdDelete className="IoCall" /></div>
                        <div className="call_driver_heading">Cancel</div>
                    </div>
                </div>
                <div className="seventh_part">
                    <button className="go_to_pick_up">Go To Pick Up</button>
                </div>
            </div>
        </div>
    )
};

export default SingleRide;