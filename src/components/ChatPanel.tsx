import "../styles/components/chat_panel.scss";
import { Dispatch, SetStateAction } from "react";
import Heading from "./Heading";
import ShowHideToggler from "./ShowHideToggler";
import { BiSend } from "react-icons/bi";


const ChatPanel = ({isChatPanelActive, setIsChatPanelActive}:{isChatPanelActive:boolean; setIsChatPanelActive:Dispatch<SetStateAction<boolean>>;}) => {

    return(
        <div className="chat_panel_cont" 
        style={{
            top:isChatPanelActive?"13px":"100%"
        }}
        >
            <ShowHideToggler toggleHandler={() => setIsChatPanelActive(false)} />
            <Heading text="Chat" />
            <div className="messanger_cont">
                <div className="messanger_screen_cont">
                    <div className="messages_cont">
                        <div className="incoming_message">
                            Bn
                        </div>
                        <div className="incoming_message">
                            Oyy
                        </div>
                        <div className="incoming_message">
                            Mom aa gaj
                        </div>
                        <div className="outgoing_message">
                            nahi
                        </div>
                        <div className="incoming_message">
                            Mom aa gaj
                        </div>
                        <div className="outgoing_message">
                            nahi
                        </div>
                        <div className="incoming_message">
                            Mom aa gaj
                        </div>
                        <div className="outgoing_message">
                            nahi
                        </div>
                        <div className="incoming_message">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos deserunt quod, ducimus culpa, error ratione minima quis necessitatibus at libero excepturi, pariatur soluta rerum ut assumenda consectetur autem eum incidunt!
                        </div>
                        <div className="outgoing_message">
                            nahi
                        </div>
                        <div className="incoming_message">
                            Mom aa gaj
                        </div>
                        <div className="outgoing_message">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore qui commodi iusto deleniti fugit eveniet, reiciendis dicta delectus. Officiis optio obcaecati vitae quibusdam delectus illum non aut accusantium voluptates. Cum! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero esse, recusandae magni alias iusto, quisquam rem cumque, rerum veniam enim a. Reprehenderit at ad natus quod tempora magni atque ullam?
                        </div>
                    </div>
                </div>
                <div className="messanger_controllers_cont">
                    <div className="input_cont">
                        <input type="text" className="message_inp" placeholder="Send a message..." />
                        <button className="send_message_btn"><BiSend className="BiSend" /></button>
                    </div>
                </div>
            </div>

        </div>
    )
};

export default ChatPanel;