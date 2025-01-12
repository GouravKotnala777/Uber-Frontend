import { SyntheticEvent } from "react";


const ImgWithFallback = ({src, fallbackSrc}:{src:string; fallbackSrc:string;}) => {

    const onErrorHandler = (e:SyntheticEvent<HTMLImageElement>) => {
        e.currentTarget.src = `${import.meta.env.VITE_SERVER_URL}/public/${fallbackSrc}`;
        e.currentTarget.alt = "fallback_image";
        e.currentTarget.onerror = null;
    }

    return(<img src={`${import.meta.env.VITE_SERVER_URL}/public/${src}`} alt={src} onError={(e) => onErrorHandler(e)} />);
};

export default ImgWithFallback;