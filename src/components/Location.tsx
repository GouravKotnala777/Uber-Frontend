import { CiLocationOn } from "react-icons/ci";

const Location = ({highlightAddress, fullAddress}:{highlightAddress:string; fullAddress:string;}) => {

    return(
        <div className="flex justify-between border-b border-gray-400">
            <CiLocationOn className="mt-4 ml-4" />
            <div className="ml-4 p-2 w-[85%]">
                <div className="font-semibold">{highlightAddress}</div>
                <div className="text-xs">{fullAddress}</div>
            </div>
        </div>
    )
};

export default Location;