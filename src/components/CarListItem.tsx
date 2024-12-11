import "../styles/components/car_list_item.scss";
import { BiUser } from "react-icons/bi";
import car from "../../public/car1.png";


const CarListItem = (carDetailes:{name:string; passengersCapacity:number; away:string; feature:string; price:number;}) => {

    return(
        <div className="list_item">
            <div className="car_icon_cont"><img src={car} alt={car} /></div>
            <div className="details_cont">
                <div className="name">{carDetailes.name} <div className="passengers_capacity"><BiUser /> {carDetailes.passengersCapacity}</div></div>
                <div className="away">{carDetailes.away}</div>
                <div className="away1">{carDetailes.feature}</div>
            </div>
            <div className="price_cont">₹{carDetailes.price}</div>
        </div>
    )
};

export default CarListItem;