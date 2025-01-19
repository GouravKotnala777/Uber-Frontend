import "../styles/components/chat_panel.scss";
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
        <div className="chat_panel_cont" 
        style={{
            top:isChatPanelActive?"13px":"100%"
        }}
        >
            <ShowHideToggler toggleHandler={() => setIsChatPanelActive(false)} />
            <Heading text={`Chat with ${senderType === "user"?"driver":"passenger"}`} />
            <div className="messanger_cont">
                <div id="messanger_screen_cont" className="messanger_screen_cont">
                    <div className="messages_cont">
                        {
                            //messages.map((msg) => {
                            //    if (msg.receiver === myUserID) {
                            //        return(
                            //            <div className="incoming_message">
                            //                {msg.content}
                            //            </div>
                            //        )
                            //    }
                            //    else if (msg.sender === myUserID){
                            //        return(
                            //            <div className="outgoing_message">
                            //                {msg.content}
                            //            </div>
                            //        )
                            //    }
                            //    else{
                            //        return(
                            //            <div className="outgoing_message">
                            //                Pata nahi kuch gadbad ho gai
                            //                receiver = {msg.receiver}
                            //                sender = {msg.sender}
                            //            </div>
                            //        )
                            //    }
                            //})
                        }



<div className="incoming_message">
                            asdasasd1
                        </div>
                        <div className="outgoing_message">
                            kjcxkhj2
                        </div>
                        <div className="incoming_message">
                            asdasasd3
                        </div>
                        <div className="outgoing_message">
                            kjcxkhj4
                        </div>
                        <div className="incoming_message">
                            asdasasd5
                        </div>
                        <div className="outgoing_message">
                            kjcxkhj
                        </div>
                        <div className="incoming_message">
                            asdasasd
                        </div>
                        <div className="outgoing_message">
                            kjcxkhj
                        </div>
                        <div className="incoming_message">
                            asdasasd
                        </div>
                        <div className="outgoing_message">
                            kjcxkhj
                        </div>
                        <div className="incoming_message">
                            asdasasd
                        </div>
                        <div className="outgoing_message">
                            kjcxkhj
                        </div>
                        <div className="incoming_message">
                            asdasasd
                        </div>
                        <div className="outgoing_message">
                            kjcxkhj
                        </div>
                        <div className="incoming_message">
                            asdasasd
                        </div>
                        <div className="outgoing_message">
                            kjcxkhj8
                        </div>
                        <div className="incoming_message">
                            asdasasd9
                        </div>
                        <div className="outgoing_message">
                            kjcxkhj10
                        </div>
                    </div>
                </div>
                <div className="messanger_controllers_cont">
                    <div className="input_cont">
                        <input type="text" className="message_inp" placeholder="Send a message..." onChange={(e) => setMessageInp(e.target.value)} />
                        {
                            messageInp &&
                                <button className="send_message_btn" onClick={createChatHandler}><BiSend className="BiSend" /></button>
                        }

                    </div>
                </div>
            </div>

        </div>
    )
};

export default ChatPanel;