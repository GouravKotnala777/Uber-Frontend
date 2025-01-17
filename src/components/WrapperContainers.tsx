import "../styles/components/scrollable_container.scss";
import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import { ResponseType } from "../utils/types";
import Spinner from "./Spinner";


interface ScrollableContainerPropTypes{
    children:ReactNode;
    height?:string;
    width?:string;
};
interface InfiniteScrollerPropTypes{
    children:ReactNode;
    height?:string;
    width?:string;
    api:(skip:number) => Promise<ResponseType<any>>;
    wholeArray:any[];
    setWholeArray:Dispatch<SetStateAction<any[]>>;
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
                    onClosePosition
                    :
                    "-100%"),
            zIndex:isPanelActive?"1":onCloseZInd||"-1"
        }}
        >
            {children}
        </div>
    )
};
export const InfiniteScroller = ({children, height, width, wholeArray, setWholeArray, api}:InfiniteScrollerPropTypes) => {
    const [skip, setSkip] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const apiHandler = async() => {
        setIsLoading(true);
        const res = await api(skip);

        if (res.success) {
            setIsLoading(false);
            if (res.jsonData.length !== 0) {
                setWholeArray([...wholeArray, ...res.jsonData]);
                setSkip((prev) => prev+1);
            }
        }
        else{
            setIsLoading(false);
        }

    };

    useEffect(() => {
        apiHandler();
    }, []);

    return(
        <div className="infinite_scroller_cont" style={{height, width}}>
            <div className="scroller_cont">
                {
                    children
                }
                <div className="next_btn_cont">
                    <button onClick={apiHandler}>{isLoading ? <Spinner width="18px" border="3px solid white" borderTop="3px solid black" /> : "next"}</button>
                </div>
            </div>
        </div>
    )
};