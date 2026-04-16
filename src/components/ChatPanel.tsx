import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Heading from "./Heading";
import ShowHideToggler from "./ShowHideToggler";
import { BiSend } from "react-icons/bi";
import { createChat } from "../api";
import { ChatTypes } from "../utils/types";
import { setScrollPositionHandler } from "../utils/utilityFunctions";

interface ChatPanelPropTypes{
    isChatPanelActive:boolean;
    setIsChatPanelActive:Dispatch<SetStateAction<boolean>>;
    receiver:string;
    senderType:"user"|"driver";
    receiverSocketID:string;
    messages:ChatTypes[];
    setMessages:Dispatch<SetStateAction<ChatTypes[]>>;
    myUserID:string;
};

const ChatPanel = ({isChatPanelActive, setIsChatPanelActive, receiver, senderType, receiverSocketID, messages, setMessages, myUserID}:ChatPanelPropTypes) => {
    const [messageInp, setMessageInp] = useState<string>("");
    //const [messages, setMessages] = useState<ChatTypes[]>([]);

    const createChatHandler = async() => {
        const newChat = await createChat({receiver, content:messageInp, senderType, receiverSocketID});

        if (newChat.success) {
            setMessageInp("");
            setMessages((prev) => [...prev, newChat.jsonData]);
        }
    };

    useEffect(() => {
        if (isChatPanelActive) {
            setScrollPositionHandler("messanger_screen_cont");
        }
    }, [messages]);
    return(
        <div className="absolute w-full h-full bg-gray-50 transition-normal duration-300 ease-in-out p-2" 
        style={{
            top:isChatPanelActive?"0%":"100%"
        }}
        >
            <ShowHideToggler toggleHandler={() => setIsChatPanelActive(false)} />
            <Heading text={`Chat with ${senderType === "user"?"driver":"passenger"}`} fontSize="16px" fontWeight={600} />
            <div className="h-[85%] relative">
                <div id="messanger_screen_cont" className="h-[90%] overflow-y-scroll asbolute top-0 scrollbar-soft">
                    <div className="">
                        {
                            messages.map((msg) => {
                                if (msg.receiver === myUserID) {
                                    return(
                                        <div className="w-[50%] ml-2 mr-auto px-3 py-2 rounded-[0_15px_15px_15px] text-gray-700 text-xs shadow-[0.1px_0.1px_1px_0.1px_var(--color-gray-500)]">
                                            {msg.content}
                                        </div>
                                    )
                                }
                                else if (msg.sender === myUserID){
                                    return(
                                        <div className="w-[50%]  ml-auto mr-2  px-3 py-2 rounded-[15px_0_15px_15px] text-gray-200 bg-gray-700 text-xs shadow-[0.1px_0.1px_1px_0.1px_var(--color-gray-500)]">
                                            {msg.content}
                                        </div>
                                    )
                                }
                                else{
                                    return(
                                        <div className="w-[50%] mx-2 my-2 px-3 py-2 rounded-[15px_0_15px_15px] text-gray-200 bg-gray-700 text-xs shadow-[0.1px_0.1px_1px_0.1px_var(--color-gray-500)]">
                                            Pata nahi kuch gadbad ho gai
                                            receiver = {msg.receiver}
                                            sender = {msg.sender}
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>
                </div>
                <div className="h-[10%]">
                    <div className="border-gray-800 bg-gray-800 flex justify-between items-center px-1 py-1 rounded-sm">
                        <input type="text" className="bg-gray-100 w-full text-sm mr-1 px-1 py-1.5 text-gray-700 rounded-sm outline-none" placeholder="Send a message..." onChange={(e) => setMessageInp(e.target.value)} />
                        <div className="w-9 h-8">
                            <button className="w-full h-full grid place-items-center bg-gray-100 rounded-sm transition-opacity ease-in-out duration-300"
                                style={{
                                    opacity:messageInp?1:0.4,
                                    filter:messageInp?"blur(0)":"blur(2px)",
                                }}
                                onClick={createChatHandler}
                            ><BiSend className="text-xl text-gray-800" /></button>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
};

export default ChatPanel;