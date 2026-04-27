//import "../styles/components/send_message_input.scss";
import { ChangeEvent } from "react";
import { BiSend } from "react-icons/bi";



export const SendMessageInput = ({text, onChangeHandler, onClickHandler}:{text:string; onChangeHandler:(e:ChangeEvent<HTMLInputElement>) => void; onClickHandler:() => Promise<void>;}) => {



    return(
        <div className="bg-gray-800 p-1 rounded-sm">
            <div className="border flex justify-between items-center gap-2">
                <input type="text" className="message_inp p-1.5 flex-1 bg-gray-100 rounded-xs" placeholder="Enter passenger OTP" onChange={onChangeHandler} />
                <button className="send_message_btn grid place-items-center h-9 w-9 bg-gray-100 text-gray-800 cursor-pointer hover:bg-white rounded-xs text-xl transition-opacity ease-in-out duration-300"
                    style={{
                        opacity:text.trim()?1:0.4,
                        filter:text.trim()?"blur(0)":"blur(2px)"
                    }}
                    onClick={onClickHandler}
                ><BiSend className="BiSend" /></button>
            </div>
        </div>
    )
}