import "../styles/components/chat_panel.scss";
import { Dispatch, SetStateAction, useState } from "react";
import Heading from "./Heading";
import ShowHideToggler from "./ShowHideToggler";
import { BiSend } from "react-icons/bi";
import { createChat } from "../api";
import { ChatTypes } from "../utils/types";

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
            setMessages((prev) => [...prev, newChat.jsonData]);
        }
    };

    return(
        <div className="chat_panel_cont" 
        style={{
            top:isChatPanelActive?"13px":"100%"
        }}
        >
            <ShowHideToggler toggleHandler={() => setIsChatPanelActive(false)} />
            <Heading text={`Chat with ${senderType === "user"?"driver":"passenger"}`} />
            <div className="messanger_cont">
                <div className="messanger_screen_cont">
                    <div className="messages_cont">
                        {
                            messages.map((msg) => {
                                if (msg.receiver === myUserID) {
                                    return(
                                        <div className="incoming_message">
                                            {msg.content}
                                        </div>
                                    )
                                }
                                else if (msg.sender === myUserID){
                                    return(
                                        <div className="outgoing_message">
                                            {msg.content}
                                        </div>
                                    )
                                }
                                else{
                                    return(
                                        <div className="outgoing_message">
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
                <div className="messanger_controllers_cont">
                    <div className="input_cont">
                        <input type="text" className="message_inp" placeholder="Send a message..." onChange={(e) => setMessageInp(e.target.value)} />
                        <button className="send_message_btn" onClick={createChatHandler}><BiSend className="BiSend" /></button>
                    </div>
                </div>
            </div>

        </div>
    )
};

export default ChatPanel;