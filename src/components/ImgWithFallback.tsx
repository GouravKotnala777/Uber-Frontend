import { SyntheticEvent } from "react";


const ImgWithFallback = ({src}:{src?:string;}) => {

    const onErrorHandler = (e:SyntheticEvent<HTMLImageElement>) => {
        e.currentTarget.src = `${import.meta.env.VITE_SERVER_URL}/public/unknown_user.png`;
        e.currentTarget.alt = "fallback_image";
        e.currentTarget.onerror = null;
    }

    return(<img src={`${import.meta.env.VITE_SERVER_URL}/public/${src}`} alt={src} onError={(e) => onErrorHandler(e)} />);
};

export default ImgWithFallback;