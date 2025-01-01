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
export const Panel = ({children, isPanelActive, onClosePosition, hasRideAcceptedHide, onCloseZInd}:{children:ReactNode; isPanelActive:boolean; onClosePosition?:string; hasRideAcceptedHide?:boolean; onCloseZInd?:string;}) => {

    return (
        <div className="panel_cont" 
        style={{
            bottom:isPanelActive?
                "0"
                :
                (hasRideAcceptedHide?
                    "-70%"
                    :
                    "-100%"),
            zIndex:isPanelActive?"1":onCloseZInd||"-1"
        }}
        >
            {children}
        </div>
    )
};