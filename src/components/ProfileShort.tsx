import "../styles/components/profile_short.scss";
import vite from "/vite.svg";

const ProfileShort = ({name, amount}:{name:string; amount:number;}) => {

    return(
        <div className="profile_short_cont">
            <div className="driver_image"><img src={vite} alt={vite} /></div>
            <div className="driver_name">
                <div className="value">{name}</div>
                <div className="heading">something</div>
            </div>
            <div className="daily_earning">
                <div className="value">₹ {amount}.00</div>
                <div className="heading">earned</div>
            </div>
        </div>
    )
};

export default ProfileShort;