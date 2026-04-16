import { BsCash } from "react-icons/bs";


const TripFee = ({amount}:{amount:number;}) => {

    return(
        <div className="flex items-center">
            <BsCash className="ml-4" />
            <div className="p-2 ml-4">
                ₹ {amount}
            </div>
        </div>
    )
};

export default TripFee;