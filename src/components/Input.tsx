import { ChangeEvent } from "react";
//import "../styles/components/input.scss";

interface InputPropTypes {
    type?:string;
    name?:string;
    placeholder:string;
    margin?:string;
    background?:string;
    border?:string;
    maxLength?:number;
    letterSpacing?:string;
    onChangeHandler:(e:ChangeEvent<HTMLInputElement>) => void;
    onClickHandler?:() => void;
}

const Input = ({
    type,
    name,
    placeholder,
    margin,
    background,
    border,
    maxLength,
    letterSpacing,
    onChangeHandler,
    onClickHandler
}:InputPropTypes) => {

    return(
        <div className="px-2">
            <input  className="text-md text-gray-700 w-full py-2 px-2 bg-gray-100 rounded-xl" type={type?type:"text"} name={name} placeholder={placeholder}
                onChange={(e) => onChangeHandler(e)}
                onClick={onClickHandler}
                maxLength={maxLength}
                style={{
                    margin:margin?margin:"0px",
                    background:background?background:"#dedede",
                    border:border?border:"none",
                    letterSpacing:letterSpacing?letterSpacing:"1px"
                }}
              />
        </div>
    )
};

export default Input;