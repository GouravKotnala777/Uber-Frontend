import "../styles/pages/home.scss";
import map from "../../public/bg-2.jpg";
import logo from "../../public/uber-logo-1.png";
import { useState } from "react";
import { BiDownArrow } from "react-icons/bi";

const Home = () => {
    const [isLocationInpActive, setIsLocationInpActive] = useState<boolean>(false);

    const inpOnClickHandler = () => {

    };

    return(
        <div className="home_page_background">
            <img className="logo" src={logo} alt={logo} />
            <div className="map_cont">
                <img src={map} alt={map} />
            </div>
            <div className="form_cont" style={{transform:isLocationInpActive?"translate(0, -70vh)":"translate(0, 0vh)"}}>
            {/*<div className="form_cont">*/}
                <form>
                    <div className="form_heading">Find a trip <BiDownArrow onClick={() => setIsLocationInpActive(false)} style={{display:isLocationInpActive?"block":"none"}} /></div>
                    <input type="text" placeholder="Add a pickup location" onClick={() => setIsLocationInpActive(true)} />
                    <input type="text" className="destination_inp" placeholder="Enter your destination" />
                </form>
            </div>
            <div className="suggestion_list_cont" style={{transform:isLocationInpActive?"translate(0, -70vh)":"translate(0, 0vh)", zIndex:isLocationInpActive?"1":"-1"}}>

            </div>
        </div>
    )
};

export default Home;