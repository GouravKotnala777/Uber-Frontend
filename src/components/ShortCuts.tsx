//import "../styles/components/short_cuts.scss";
import { IconType } from "react-icons";

export interface ShortcutTypes {
    icon:IconType;
    heading:string|number;
    subHeading:string|number;
    onClickHandler?:() => void;
};



const ShortCuts = ({shortcuts}:{shortcuts:ShortcutTypes[]}) => {

    return(
        <div className="flex flex-wrap justify-between bg-yellow-300 px-2 py-4 gap-4">
            {
                shortcuts.map(item => (
                    <div className="mt-2">
                        <div className="mx-auto w-7 h-7 grid place-items-center rounded-full bg-gray-100 p-1 border-2 border-yellow-500 text-gray-700" onClick={item.onClickHandler}><item.icon className="Icon" /> </div>
                        <div className="text-center text-xs text-gray-800">{item.heading}</div>
                        <div className="text-[10px] text-center text-gray-500">{item.subHeading}</div>
                    </div>
                ))
            }
        </div>
    )
};

export default ShortCuts;