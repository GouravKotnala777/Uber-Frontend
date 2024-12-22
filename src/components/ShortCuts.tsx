import "../styles/components/short_cuts.scss";
import { IconType } from "react-icons";

export interface ShortcutTypes {
    icon:IconType;
    heading:string|number;
    subHeading:string|number;
    onClickHandler?:() => void;
};



const ShortCuts = ({shortcuts}:{shortcuts:ShortcutTypes[]}) => {

    return(
        <div className="short_cuts_cont">
            {
                shortcuts.map(item => (
                    <div className="single_short_cut_cont">
                        <div className="short_cut_icon" onClick={item.onClickHandler}><item.icon className="Icon" /> </div>
                        <div className="short_cut_heading">{item.heading}</div>
                        <div className="short_cut_sub_heading">{item.subHeading}</div>
                    </div>
                ))
            }
        </div>
    )
};

export default ShortCuts;