import "../styles/pages/login.scss";
import logo from "/uber-logo-1.png";
import { Link } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import { RegisterBodyTypes } from "../utils/types";
import { register } from "../api";
import Button from "../components/Button";

const Register = () => {
    const [registerFormData, setRegisterFormData] = useState<RegisterBodyTypes>({firstName:"", lastName:"", email:"", password:"", mobile:"", gender:"male"});
    

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
        setRegisterFormData({...registerFormData, [e.target.name]:e.target.value});
    };

    const registerHandler = async() => {
        const res = await register(registerFormData);
        console.log(res);
    };

    return(
        <div className="register_page_bg">
            <div className="logo_cont">
                <img src={logo} alt={logo} />
            </div>
            <div className="form_cont">
                <label>What's your name</label>
                <div className="fullname_cont">
                    <input type="text" className="first_name" name="firstName" placeholder="First Name"  onChange={(e) => onChangeHandler(e)} />
                    <input type="text" className="first_name" name="lastName" placeholder="Last Name" onChange={(e) => onChangeHandler(e)} />
                </div>
                <label>What's your email</label>
                <input type="text" name="email" placeholder="Email" onChange={(e) => onChangeHandler(e)} />
                <label>Enter your password</label>
                <input type="text" name="password" placeholder="Password" onChange={(e) => onChangeHandler(e)} />
                <label>Enter your mobile number</label>
                <input type="text" name="mobile" placeholder="Mobile" onChange={(e) => onChangeHandler(e)} />
                <label>Enter your gender</label>
                <select className="gender_select" onChange={(e) => onChangeHandler(e)}>
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
                <Button text="Register" margin="25px 0 0 0" onClickHandler={registerHandler} />
                <p>Already have a account? <Link to="/user/login" className="link"> Login here</Link></p>
                <p className="bottom_line">this site is protected by reCAPTCHA and the Google Policy and the Terms of Service apply </p>
                
            </div>
        </div>
    )
};

export default Register;