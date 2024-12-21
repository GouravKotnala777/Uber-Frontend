import { MouseEvent } from "react";
import "../styles/components/button.scss";

interface ButtonPropTypes {
    text:string;
    color?:string;
    background?:string;
    border?:boolean;
    margin?:string;
    onClickHandler:(e:MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({text, color, background, border, margin, onClickHandler}:ButtonPropTypes) => {

    return(
        <div className="button_cont">
            <button className="button" onClick={onClickHandler} style={{
                color:color?color:"white",
                background:background?background:"black",
                border:border?`1px solid ${color}`:"1px solid black",
                margin:margin?margin:"0px"
                }}>{text}</button>
        </div>
    )
};

export default Button;