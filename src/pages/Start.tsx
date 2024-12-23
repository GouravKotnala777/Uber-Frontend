import "../styles/pages/start.scss";
import bg from "/bg-3.jpg";
import logo from "/uber-logo-1.png";
import Heading from "../components/Heading";
import Button from "../components/Button";


const Start = () => {


    return(
        <div className="start_page_bg">
            <div className="bg_image_cont">
                <img className="logo" src={logo} alt={logo} />
                <img className="bg_img" src={bg} alt={bg} />
            </div>
            <div className="continue_cont">
                <Heading text="Get started with Uber" />
                <Button text="Continue" margin="20px 0 0 0" onClickHandler={() => {}} />
            </div>
        </div>
    )
};

export default Start;