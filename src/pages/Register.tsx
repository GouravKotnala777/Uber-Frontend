import "../styles/pages/login.scss";
import logo from "../../public/uber-logo-1.png";
import { Link } from "react-router-dom";

const Register = () => {

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
                <button className="register_btn">Register</button>
                <p>Already have a account? <Link to="/user/login" className="link"> Login here</Link></p>
                <p className="bottom_line">this site is protected by reCAPTCHA and the Google Policy and the Terms of Service apply </p>
                
            </div>
        </div>
    )
};

export default Register;