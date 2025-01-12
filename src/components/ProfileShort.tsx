import "../styles/components/profile_short.scss";
import ImgWithFallback from "./ImgWithFallback";

const ProfileShort = ({name, amount, distance, profileImg}:{name:string; amount:number; distance?:number; profileImg:string;}) => {

    return(
        <div className="profile_short_cont">
            <div className="driver_image"><ImgWithFallback src={profileImg} fallbackSrc="unknown_user.png" /></div>
            <div className="driver_name">
                <div className="value">{name}</div>
                <div className="heading">distance</div>
            </div>
            <div className="daily_earning">
                <div className="value">₹ {amount}.00</div>
                {
                    distance ?
                        <div className="heading">{((distance as number)/1000).toFixed(1)} km</div>
                        :
                        <div className="heading">earned</div>

                }
            </div>
        </div>
    )
};

export default ProfileShort;