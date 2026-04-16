//import "../styles/components/scrollable_container.scss";
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
        <div className="relative overflow-y-scroll h-[80%] scrollbar-soft" style={{
            //height:height?height:"200px",
            ...(height&&{height}),
            width:width?width:"100%"
        }}>
            {children}
        </div>
    )
};
export const CenterContainer = ({children}:{children:ReactNode;}) => {
    return(
        <div className="h-24 w-30 mx-auto">
            {children}
        </div>
    )
};
export const Panel = ({children, isPanelActive, onClosePosition, hasRideAcceptedHide, onCloseZInd}:{children:ReactNode; isPanelActive:boolean; onClosePosition?:string; hasRideAcceptedHide?:boolean; onCloseZInd?:string;}) => {

    return (
        <div className="h-[70%] w-full bg-white absolute transition-all duration-500 ease-in-out" 
        style={{
            bottom:isPanelActive?
                "0%"
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
        <div className="my-2 min-h-[90%]" style={{height, width}}>
            {
                wholeArray.length !== 0?
                    <div className="">
                        {
                            children
                        }
                        <div className="bg-gray-800 text-gray-200 rounded-sm my-4">
                            <button className="p-1 w-full" onClick={apiHandler}>{isLoading ? <Spinner width="18px" border="3px solid white" borderTop="3px solid black" /> : "next"}</button>
                        </div>
                    </div>
                    :
                    <div className="h-98 flex flex-col justify-center items-center">
                        <h1 className="text-gray-700 text-md font-semibold">No Ride History</h1>
                        <p className="text-gray-500 text-xs">it looks like you have not booked your first ride yet.</p>
                    </div>
            }
        </div>
    )
};