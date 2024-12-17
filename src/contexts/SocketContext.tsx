import {createContext, ReactNode, useEffect} from "react";
import {io} from "socket.io-client";

export interface SocketContextTypes {
    sendMessage:(eventName:string, message:string|Record<string, unknown>) => void;
    receiveMessage:(eventName:string, callback:<T>(data:T) => void) => void;
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

    const sendMessage = (eventName:string, message:string|Record<string, unknown>):void => {
        socket.emit(eventName, message);
    };

    const receiveMessage = <T extends unknown>(eventName:string, callback:(data:T) => void) => {
        socket.on(eventName, callback);
    };

    return(
        <SocketDataContext.Provider value={{sendMessage, receiveMessage}}>
            {children}
        </SocketDataContext.Provider>
    )
};

export default SocketContext;