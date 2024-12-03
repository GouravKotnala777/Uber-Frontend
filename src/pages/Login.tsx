import "../styles/pages/login.scss";
import logo from "../../public/uber-logo-1.png";
import { Link } from "react-router-dom";

const Login = () => {

    return(
        <div className="register_page_bg">
            <div className="logo_cont">
                <img src={logo} alt={logo} />
            </div>
            <div className="form_cont">
                <label>What's your email</label>
                <input type="text" name="fullName" placeholder="Email" />
                <label>Enter your password</label>
                <input type="text" name="password" placeholder="Password" />
                <button className="register_btn">Login</button>
                <p>Don't have a account? <Link to="/user/login" className="link"> Register here</Link></p>
                <p className="bottom_line">this site is protected by reCAPTCHA and the Google Policy and the Terms of Service apply </p>
                
            </div>
        </div>
    )
};

export default Login;