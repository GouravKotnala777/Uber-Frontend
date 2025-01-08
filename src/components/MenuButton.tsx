import { TiMessages } from "react-icons/ti";
import "../styles/components/menu_button.scss";
import { BiDownArrow, BiTrip, BiUser } from "react-icons/bi";
import { Dispatch, SetStateAction } from "react";

const newChatNotification = 0;
const MenuButton = ({setIsChatPanelActive, setIsMyProfilePanelActive, setIsMyPastTripsPanelActive, isShortcutMenuActive, setIsShortcutMenuActive}:{setIsChatPanelActive:Dispatch<SetStateAction<boolean>>; setIsMyProfilePanelActive:Dispatch<SetStateAction<boolean>>; setIsMyPastTripsPanelActive:Dispatch<SetStateAction<boolean>>;
    isShortcutMenuActive:boolean; setIsShortcutMenuActive:Dispatch<SetStateAction<boolean>>;
}) => {


    return(
        <div className="menu_button_cont">
            <div className="short_cut_menu_handler" style={{
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
            </div>
            <div className="chat_short_cut" style={{top:isShortcutMenuActive?"60px":"0px"}} onClick={(e) => {e.stopPropagation(); setIsChatPanelActive(true);}}>
                <TiMessages className="TiMessages" />
                {
                    newChatNotification ?
                        <div className="notification">{newChatNotification}</div>
                        :
                        ""
                }
            </div>
            <div className="my_profile_short_cut" style={{top:isShortcutMenuActive?"120px":"0px"}} onClick={(e) => {e.stopPropagation(); setIsMyProfilePanelActive(true);}}>
                <BiUser className="TiMessages" />
                {
                    newChatNotification ?
                        <div className="notification">{newChatNotification}</div>
                        :
                        ""
                }
            </div>
            <div className="past_trips_short_cut" style={{top:isShortcutMenuActive?"180px":"0px"}} onClick={(e) => {e.stopPropagation(); setIsMyPastTripsPanelActive(true);}}>
                <BiTrip className="TiMessages" />
                {
                    newChatNotification ?
                        <div className="notification">{newChatNotification}</div>
                        :
                        ""
                }
            </div>
        </div>
    )
};

export default MenuButton;