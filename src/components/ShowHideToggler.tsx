//import "../styles/components/show_hide_toggler.scss";
import { IoIosArrowDown } from "react-icons/io";

interface ShowHideTogglerPropTypes{
    hide?:boolean;
    toggleHandler:() => void;
}

const ShowHideToggler = ({hide, toggleHandler}:ShowHideTogglerPropTypes) => {

    return(
        <div className="h-6">
            <button className="outline-none text-[1.3rem] bg-gray-100 h-full w-full cursor-pointer"
                onClick={toggleHandler}
                style={{
                    display:hide?"none":"inline"
                }}
            >
                <IoIosArrowDown className="mx-auto" />
                </button>
        </div>
    )
};

export default ShowHideToggler;