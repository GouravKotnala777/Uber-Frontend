import { BiUser } from "react-icons/bi";
import { VehicleTypeTypes } from "../utils/types";


const CarListItem = ({allFare, vehicleType, vehicleDescription, vehicleCapacity, vehicleImg}:{vehicleType:VehicleTypeTypes; allFare:{[P in VehicleTypeTypes]:number;}; vehicleDescription:string; vehicleCapacity:number; vehicleImg:string;}) => {

    return(
        <div className="flex py-1 text-gray-600 rounded-lg my-4 border-2 border-transparent hover:border-gray-700 cursor-pointer">
            <div className="w-[30%]"><img src={vehicleImg} alt={vehicleImg} className="w-[75%]" /></div>
            <div className="w-[50%] font-semibold">
                <div className="">{vehicleType} <div className="text-xs ml-2 flex items-center"><BiUser /> {vehicleCapacity}</div></div>
                <div className="text-xs text-gray-600">{"2 minutes away 15.24"}</div>
                <div className="text-xs text-gray-400">{vehicleDescription}</div>
            </div>
            <div className="w-[20%] text-lg tracking-wider font-semibold">₹{allFare[vehicleType]}</div>
        </div>
    )
};

export default CarListItem;