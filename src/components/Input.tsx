import { ChangeEvent } from "react";
import "../styles/components/input.scss";

interface InputPropTypes {
    type?:string;
    name?:string;
    placeholder:string;
    margin?:string;
    onChangeHandler:(e:ChangeEvent<HTMLInputElement>) => void;
    onClickHandler?:() => void;
}

const Input = ({
    type,
    name,
    placeholder,
    margin,
    onChangeHandler,
    onClickHandler
}:InputPropTypes) => {

    return(
        <div className="input_cont">
            <input type={type?type:"text"} name={name} className="input" placeholder={placeholder}
                onChange={(e) => onChangeHandler(e)}
                onClick={onClickHandler}
                style={{
                    margin:margin?margin:"0px"
                }}
              />
        </div>
    )
};

export default Input;