import "../styles/components/car_list_item.scss";
import { BiUser } from "react-icons/bi";
import { VehicleTypeTypes } from "../utils/types";


const CarListItem = ({allFare, vehicleType, vehicleDescription, vehicleCapacity, vehicleImg}:{vehicleType:VehicleTypeTypes; allFare:{[P in VehicleTypeTypes]:number;}; vehicleDescription:string; vehicleCapacity:number; vehicleImg:string;}) => {

    //Image theek karni hai
    //Image box component banana hai


    return(
        <div className="list_item">
            <div className="car_icon_cont"><img src={vehicleImg} alt={vehicleImg} /></div>
            <div className="details_cont">
                <div className="name">{vehicleType} <div className="passengers_capacity"><BiUser /> {vehicleCapacity}</div></div>
                <div className="away">{"2 minutes away 15.24"}</div>
                <div className="away1">{vehicleDescription}</div>
            </div>
            <div className="price_cont">₹{allFare[vehicleType]}</div>
        </div>
    )
};

export default CarListItem;