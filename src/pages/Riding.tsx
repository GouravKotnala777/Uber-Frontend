import { MdOutlineLocationOn } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import { useContext, useEffect, useState } from "react";
import { RideAcceptedEventMessageType } from "./Home";
import { useLocation, useNavigate } from "react-router-dom";
import { LocationTypes } from "../utils/types";
import Location from "../components/Location";
import ProfileLong from "../components/ProfileLong";
import Button from "../components/Button";
import Heading from "../components/Heading";
import ShowHideToggler from "../components/ShowHideToggler";
import LiveTracking from "../components/LiveTracking";
import { createPayment } from "../api";
import { SocketContextTypes, SocketDataContext } from "../contexts/SocketContext";
import { redirectAfterToast } from "../utils/utilityFunctions";
import { Toaster } from "react-hot-toast";
import { Panel, ScrollableContainer } from "../components/WrapperContainers";
import ShortCuts from "../components/ShortCuts";
import { TbShieldPin } from "react-icons/tb";
import AllReviews from "../components/AllReviews";
import { RIDE_CANCELLED, RIDE_ENDED } from "../utils/constants";


const shortcuts = [
    {icon:TbShieldPin, heading:"Safety", subHeading:"heading"},
    {icon:MdOutlineLocationOn, heading:"Share my trip", subHeading:"heading"},
    {icon:IoCallOutline, heading:"Call driver", subHeading:"heading"}
];
//const {activeDriver, dropoffLocation, amount}:{activeDriver:RideAcceptedEventMessageType|undefined; dropoffLocation:LocationTypes|undefined; amount:number;} = {
//    activeDriver:{
//        //{
//        rideID:"69d8b7fca9a71e0d8d1d4587",
//        driverEmail:"user2@gmail.com",
//        driverGender:"male",
//        driverMobile:"098765456789",
//        driverName:"User2 Kumar",
//        driverSocketID:"iuhgfcvhjklkj",
//        driverImg:"",
//            //_id:"123456776543",
//            //distance:100,
//            //dropoffLocation:{address:"", longitude:124321, latitude:1245321},
//            //duration:10,
//            //fare:100,
//            otp:"998290",
//            //passengerID:"1345676542221",
//            //pickupLocation:{address:"", longitude:1234532, latitude:1234332},
//            status:"requested",
//            //createdAt:new Date(),
//            //updatedAt:new Date(),
//            driverID:"69d8b7fca9a71e0d8d1d4587",
//            licenseNumber:"license00001",
//            rating:"4",
//            //orderID:"asdjhgsd",
//            //paymentID:"asdrewqeweg",
//            //signature:"adgfdsa",
//            vehicleDetailes:{
//                vehicleColor:"red",
//                vehicleModel:"model00001",
//                vehicleNumber:"hr00001",
//                vehicleType:"uberXL"
//            }
//        //}
//    },
//    amount:101,
//    dropoffLocation:{
//        latitude:12345321,
//        longitude:12345321,
//        address:"mera ghar patoni kaha hai",
//    }
//};

const Riding = () => {
    const [isRideDetailsActive, setisRideDetailsActive] = useState<boolean>(true);
    const {activeDriver, dropoffLocation, amount}:{activeDriver:RideAcceptedEventMessageType|undefined; dropoffLocation:LocationTypes|undefined; amount:number;} = useLocation().state;
    const socketContext = useContext<SocketContextTypes|null>(SocketDataContext);
    const navigate = useNavigate();

    if (!socketContext) {
        // Handle the case where the context is null
        throw new Error("SocketDataContext is not provided!");
    };

    const {receiveMessage} = socketContext;

    const makePaymentHandler = async() => {
        const newPayment = await createPayment({rideID:activeDriver?.rideID as string, amount, paymentMethod:"cash", paymentStatus:"completed"});
        redirectAfterToast({res:newPayment, redirectWithoutReload:{navigate, url:"/user/home"}})
    };

    useEffect(() => {
        receiveMessage(RIDE_CANCELLED, (data) => {
            console.log(data as {data:{rideID:string}});
            redirectAfterToast({res:{success:false, message:"Driver cancelled ride", jsonData:{}}, redirectWithReload:"/user/home"});
        })
    }, []);
    useEffect(() => {
        receiveMessage(RIDE_ENDED, (data) => {
            console.log(data as {data:{rideID:string}});
            redirectAfterToast({res:{success:true, message:"Ride ended", jsonData:{}}});
        })
    }, []);

    return(
        <div className="relative max-w-xs h-screen max-h-screen mx-auto overflow-hidden">
            <Toaster />
            {/*<pre>{JSON.stringify(activeDriver, null, `\t`)}</pre>*/}
            <div className="map_cont">
                <LiveTracking />
            </div>
            <div className="another_cont">aa</div>
            <Panel isPanelActive={isRideDetailsActive} onClosePosition="-67%" onCloseZInd="2" hasRideAcceptedHide={true}>
                <ShowHideToggler toggleHandler={() => setisRideDetailsActive(!isRideDetailsActive)} />
                <ScrollableContainer height="80%">
                    <div className="flex justify-between items-center px-2 my-2">
                        <Heading text="You are currently riding" fontSize="16px" fontWeight={600} />
                        <div className="text-center px-2 py-1 bg-gray-800 text-gray-100 text-xs">
                            <div className="value">2</div>
                            <div className="unit">min</div>
                        </div>
                    </div>
                    <ProfileLong driverDetails={activeDriver as RideAcceptedEventMessageType} />
                    <ShortCuts shortcuts={shortcuts} />
                    <Location highlightAddress="Shop No.24" fullAddress={dropoffLocation?.address as string} />
                    <AllReviews driverID={activeDriver?.driverID as string} rideID={activeDriver?.rideID as string} />
                </ScrollableContainer>
                {
                    activeDriver?.rideID &&
                        <Button text="Make payment" margin="15px 0 0 0" onClickHandler={makePaymentHandler} />
                }
            </Panel>
        </div>
    )
};

export default Riding;