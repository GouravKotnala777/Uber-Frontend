//import "../styles/components/profile_short.scss";
import ImgWithFallback from "./ImgWithFallback";

const ProfileShort = ({name, amount, distance, profileImg}:{name:string; amount:number; distance?:number; profileImg:string;}) => {

    return(
        <div className="my-4">
            <div className="flex justify-between">
                <div className="w-20 h-20">
                    <ImgWithFallback src={profileImg} fallbackSrc="unknown_user.png" />
                </div>
                <div className="">
                    <div className="text-sm text-gray-700">{name}</div>
                    <div className="text-sm text-gray-600 text-right">{distance}km</div>
                </div>
            </div>
            <div className="text-right">
                <div className="text-gray-800 font-semibold text-sm">₹ {amount}.00</div>
                {
                    distance ?
                        <div className="text-gray-700 text-sm">{((distance as number)/1000).toFixed(1)} km</div>
                        :
                        <div className="text-gray-700 text-sm">earned</div>

                }
            </div>
        </div>
    )
};

export default ProfileShort;