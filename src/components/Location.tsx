import { CiLocationOn } from "react-icons/ci";
import "../styles/components/location.scss";

const Location = ({highlightAddress, fullAddress}:{highlightAddress:string; fullAddress:string;}) => {

    return(
        <div className="pickup_location_details_cont">
            <CiLocationOn className="CiLocationOn" />
            <div className="pickup_location_details">
                <div className="highlight_info">{highlightAddress}</div>
                <div className="full_info">{fullAddress}</div>
            </div>
        </div>
    )
};

export default Location;