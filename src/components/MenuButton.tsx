import { TiMessages } from "react-icons/ti";
//import "../styles/components/menu_button.scss";
import { BiDownArrow, BiTrip, BiUser } from "react-icons/bi";
import { Dispatch, SetStateAction } from "react";

const newChatNotification = 0;
const MenuButton = ({setIsChatPanelActive, setIsMyProfilePanelActive, setIsMyPastTripsPanelActive, isShortcutMenuActive, setIsShortcutMenuActive}:{setIsChatPanelActive:Dispatch<SetStateAction<boolean>>; setIsMyProfilePanelActive:Dispatch<SetStateAction<boolean>>; setIsMyPastTripsPanelActive:Dispatch<SetStateAction<boolean>>;
    isShortcutMenuActive:boolean; setIsShortcutMenuActive:Dispatch<SetStateAction<boolean>>;
}) => {


    return(
        <div className="absolute top-27 right-3.5">
            <div className="relative">
                
                <button className="bg-white p-2 rounded-full absolute top-0 left-0 transition-normal duration-300 ease-in-out" style={{top:isShortcutMenuActive?"38px":"0px"}}
                    onClick={(e) => {                        
                        e.stopPropagation();
                        setIsChatPanelActive(true);
                        }}>
                    <TiMessages className="TiMessages" />
                    {
                        newChatNotification ?
                            <div className="notification">{newChatNotification}</div>
                            :
                            ""
                    }
                </button>
                <button className="bg-white p-2 rounded-full absolute top-0 left-0 transition-normal duration-300 delay-100 ease-in-out" style={{top:isShortcutMenuActive?"76px":"0px"}}
                    onClick={(e) => {e.stopPropagation(); setIsMyProfilePanelActive(true);}}>
                    <BiUser className="TiMessages" />
                    {
                        newChatNotification ?
                            <div className="notification">{newChatNotification}</div>
                            :
                            ""
                    }
                </button>
                <button className="bg-white p-2 rounded-full absolute top-0 left-0 transition-normal duration-300 delay-200 ease-in-out" style={{top:isShortcutMenuActive?"114px":"0px"}}
                    onClick={(e) => {e.stopPropagation(); setIsMyPastTripsPanelActive(true);}}>
                    <BiTrip className="TiMessages" />
                    {
                        newChatNotification ?
                            <div className="notification">{newChatNotification}</div>
                            :
                            ""
                    }
                </button>
                <button className="bg-white p-2 rounded-full transition-transform duration-600 ease-in-out hover:bg-gray-100" style={{
                    top:isShortcutMenuActive?"0px":"0px",
                    transform:isShortcutMenuActive?"rotate(180deg)":"rotate(0deg)"
                    }} onClick={(e) => {e.stopPropagation(); setIsShortcutMenuActive(!isShortcutMenuActive);}}>
                    
                    <BiDownArrow className="TiMessages" />
                    {
                        newChatNotification ?
                            <div className="notification">{newChatNotification}</div>
                            :
                            ""
                    }
                </button>
            </div>
        </div>
    )
};

export default MenuButton;