import { useNavigate } from "react-router-dom";
import Heading from "../components/Heading";


const PageNotFound = () => {
    const navigate = useNavigate();

    return(
        <div className="page_not_found">
            <Heading text="Page not found" fontSize="1.3rem" />
            <button onClick={() => navigate("/user/home")}>Go back home</button>
        </div>
    )
};

export default PageNotFound;