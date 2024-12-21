import { FaArrowDown } from "react-icons/fa";
import "../styles/components/show_hide_toggler.scss";
import { IoIosArrowDown } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";

interface ShowHideTogglerPropTypes{
    hide?:boolean;
    toggleHandler:() => void;

}

const ShowHideToggler = ({hide, toggleHandler}:ShowHideTogglerPropTypes) => {

    return(
        <div className="show_hide_toggler_cont">
            <button className="toggle_btn"
                onClick={toggleHandler}
                style={{
                    display:hide?"none":"inline"
                }}
            >
                <IoIosArrowDown className="IoIosArrowDown" />
                </button>
        </div>
    )
};

export default ShowHideToggler;