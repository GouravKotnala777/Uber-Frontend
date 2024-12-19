import "../styles/components/trip_fee.scss";
import { BsCash } from "react-icons/bs";


const TripFee = ({amount}:{amount:number;}) => {

    return(
        <div className="price_cont">
            <BsCash className="BsCash" />
            <div className="price">
                ₹ {amount}
            </div>
        </div>
    )
};

export default TripFee;