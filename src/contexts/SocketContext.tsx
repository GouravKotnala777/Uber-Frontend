import React, {createContext, ReactNode, useEffect} from "react";
import {io} from "socket.io-client";

export interface SocketContextTypes {
    sendMessage:(eventName:string, message:{userType:"user"|"driver"|"admin"; userID:string;}) => void;
    receiveMessage:(eventName:string, callback:() => void) => void;
}

export const SocketDataContext = createContext<SocketContextTypes|null>(null);

const socket = io(import.meta.env.VITE_SERVER_URL);

const SocketContext = ({children}:{children:ReactNode}) => {

    useEffect(() => {
        socket.on("connect", () => {
            console.log("connected to server");            
        });
        socket.on("disconnect", () => {
            console.log("disconnect from server");            
        });

        //return () => {
        //    socket.disconnect();
        //}
    }, []);

    const sendMessage = (eventName:string, message:{userType:"user"|"driver"|"admin"; userID:string;}) => {
        socket.emit(eventName, message);
    };

    const receiveMessage = (eventName:string, callback:() => void) => {
        socket.on(eventName, callback);
    };

    return(
        <SocketDataContext.Provider value={{sendMessage, receiveMessage}}>
            {children}
        </SocketDataContext.Provider>
    )
};

export default SocketContext;