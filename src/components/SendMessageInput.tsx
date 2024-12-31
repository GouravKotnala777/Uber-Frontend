import "../styles/components/send_message_input.scss";
import { ChangeEvent } from "react";
import { BiSend } from "react-icons/bi";



export const SendMessageInput = ({onChangeHandler, onClickHandler}:{onChangeHandler:(e:ChangeEvent<HTMLInputElement>) => void; onClickHandler:() => Promise<void>;}) => {

    return(
        <div className="send_message_cont">
            <div className="input_cont">
                <input type="text" className="message_inp" placeholder="Enter passenger OTP" onChange={onChangeHandler} />
                <button className="send_message_btn" onClick={onClickHandler}><BiSend className="BiSend" /></button>
            </div>
        </div>
    )
}