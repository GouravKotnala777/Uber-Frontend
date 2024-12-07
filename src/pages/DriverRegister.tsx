import "../styles/pages/login.scss";
import logo from "../../public/uber-logo-1.png";
import { Link } from "react-router-dom";


const DriverRegister = () => {

    return(
        <div className="register_page_bg">
        <div className="logo_cont">
            <img src={logo} alt={logo} />
        </div>
        <div className="form_cont">
            <label>What's your name</label>
            <div className="fullname_cont">
                <input type="text" className="first_name" name="firstName" placeholder="First Name" />
                <input type="text" className="first_name" name="lastName" placeholder="Last Name" />
            </div>
            <label>What's your email</label>
            <input type="text" name="fullName" placeholder="Email" />
            <label>Enter your password</label>
            <input type="text" name="password" placeholder="Password" />

            <label>Vehicle information</label>
            <div className="vehicle_info_inps">
                <input type="text" name="vehicleColor" placeholder="Password" />
                <input type="text" name="vehicleNumber" placeholder="Password" />
                <input type="text" name="VehicleModel" placeholder="Password" />
                <select name="vehicleType">
                    <option value="car">--select type--</option>
                    <option value="car">car</option>
                    <option value="motorcycle">motorcycle</option>
                    <option value="auto">auto</option>
                    <option value="van">van</option>
                </select>
            </div>

            <button className="register_btn">Create Driver Account</button>
            <p>Already have a account? <Link to="/user/login" className="link"> Login here</Link></p>
            <p className="bottom_line">this site is protected by reCAPTCHA and the Google Policy and the Terms of Service apply </p>
            
        </div>
    </div>
    )
};

export default DriverRegister;