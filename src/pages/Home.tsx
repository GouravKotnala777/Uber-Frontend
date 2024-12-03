import "../styles/pages/home.scss";
import bg from "../../public/bg-3.jpg";
import logo from "../../public/uber-logo-1.png";
import { FaArrowRight } from "react-icons/fa6";


const Home = () => {


    return(
        <div className="home_page_bg">
            <div className="bg_image_cont">
                <img className="logo" src={logo} alt={logo} />
                <img className="bg_img" src={bg} alt={bg} />
            </div>
            <div className="continue_cont">
                <div className="heading">Get started with Uber</div>
                <div className="continue_btn">
                    <button><span>Continue</span><FaArrowRight className="BiRightArrow" /></button>
                </div>
            </div>
        </div>
    )
};

export default Home;