import { useNavigate } from "react-router-dom";
import Heading from "../components/Heading";
import img from "/public/page-not-found8.png";
import Button from "../components/Button";


const PageNotFound = () => {
    const navigate = useNavigate();

    return(
        <div className="flex flex-col justify-center text-center max-w-xs h-screen max-h-screen mx-auto overflow-hidden">
                <Heading text="Page not found" fontSize="1.5rem" />
                <img src={img} alt={img} className="w-full" />
            <Button text="Go back to home" onClickHandler={() => navigate("/user/home")} />
        </div>
    )
};

export default PageNotFound;