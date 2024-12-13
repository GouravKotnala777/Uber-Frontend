import "../styles/components/car_list_item.scss";
import { BiUser } from "react-icons/bi";
import car from "../../public/car1.png";
import { VehicleTypeTypes } from "../utils/types";


const CarListItem = ({allFare, vehicleType}:{vehicleType:VehicleTypeTypes; allFare:{auto:number; car:number; motorcycle:number;}}) => {

    return(
        <div className="list_item">
            <div className="car_icon_cont"><img src={car} alt={car} /></div>
            <div className="details_cont">
                <div className="name">{vehicleType} <div className="passengers_capacity"><BiUser /> {2}</div></div>
                <div className="away">{"2 minutes away 15.24"}</div>
                <div className="away1">{"affordable compact"}</div>
            </div>
            <div className="price_cont">₹{allFare[vehicleType]}</div>
        </div>
    )
};

export default CarListItem;