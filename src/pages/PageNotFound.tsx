import "../styles/pages/page_not_found.scss";
import { useNavigate } from "react-router-dom";
import Heading from "../components/Heading";
import img from "/public/page-not-found8.png";
import { CenterContainer } from "../components/WrapperContainers";
import Button from "../components/Button";


const PageNotFound = () => {
    const navigate = useNavigate();

    return(
        <div className="page_not_found">
            <CenterContainer>
                <Heading text="Page not found" fontSize="1.5rem" />
            </CenterContainer>
            <CenterContainer>
                <img src={img} alt={img} />
            </CenterContainer>
            <Button text="Go back to home" onClickHandler={() => navigate("/user/home")} />
        </div>
    )
};

export default PageNotFound;