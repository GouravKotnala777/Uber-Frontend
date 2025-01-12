import { MouseEvent } from "react";
import "../styles/components/button.scss";
import Spinner from "./Spinner";

interface ButtonPropTypes {
    text:string;
    color?:string;
    background?:string;
    border?:boolean;
    margin?:string;
    isLoading?:boolean;
    onClickHandler:(e:MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({text, color, background, border, margin, isLoading, onClickHandler}:ButtonPropTypes) => {

    return(
        <div className="button_cont">
            <button className="button" onClick={onClickHandler} disabled={isLoading} style={{
                color:color?color:"white",
                background:background?background:"black",
                border:border?`1px solid ${color}`:"1px solid black",
                margin:margin?margin:"0px",
                }}>
                    {
                        isLoading ? 
                            <Spinner width="17.5px" border="3px solid #eeeeee" borderTop="3px solid black" />
                            :
                            text
                    }
                    
                </button>
        </div>
    )
};

export default Button;