import "../styles/components/scrollable_container.scss";
import { ReactNode } from "react";


interface ScrollableContainerPropTypes{
    children:ReactNode;
    height?:string;
    width?:string;
};

export const ScrollableContainer = ({children, height, width}:ScrollableContainerPropTypes) => {

    return(
        <div className="scrollable_container_cont" style={{
            height:height?height:"200px",
            width:width?width:"100%"
        }}>
            {children}
        </div>
    )
};
export const CenterContainer = ({children}:{children:ReactNode;}) => {
    return(
        <div className="center_container_cont">
            {children}
        </div>
    )
};
export const Panel = ({children, isPanelActive}:{children:ReactNode; isPanelActive:boolean;}) => {

    return (
        <div className="panel_cont" 
        style={{bottom:isPanelActive?"0":"-100%", zIndex:isPanelActive?"1":"-1"}}
        >
            {children}
        </div>
    )
};