import { Dispatch, MouseEvent, SetStateAction } from "react";
import Heading from "./Heading";
import ShowHideToggler from "./ShowHideToggler";
import CarListItem from "./CarListItem";
import Location from "./Location";
import { InfiniteScroller, ScrollableContainer } from "./WrapperContainers";
import { createRideRequest, myAllPastRidesPassenger } from "../api";
import { RideTypesPopulated, VehicleTypeTypes } from "../utils/types";
import { vehicleCapacity, vehicleDescription } from "../utils/constants";
import { vehicleImages } from "../pages/Home";


interface PastTripsPanelPropTypes{
    myPastRides:RideTypesPopulated[];
    setMyPastRides:Dispatch<SetStateAction<RideTypesPopulated[]>>;
    isMyPastTripsPanelActive:boolean;
    setIsMyPastTripsPanelActive:Dispatch<SetStateAction<boolean>>;
    setIsWaitingPanelActive?:Dispatch<SetStateAction<boolean>>;
    setSelectedVehicleType?:Dispatch<SetStateAction<VehicleTypeTypes>>;
};


const PastTripsPanel = ({myPastRides, setMyPastRides, isMyPastTripsPanelActive, setIsMyPastTripsPanelActive, setIsWaitingPanelActive, setSelectedVehicleType, }:PastTripsPanelPropTypes) => {
    //const [myPastRides, setMyPastRides] = useState<RideTypesPopulated[]>([]);
    //const navigate = useNavigate();



    return(
        <div className="bg-gray-50 absolute transition-all duration-300 ease-in-out z-10 h-full w-full p-2" 
        style={{
            top:isMyPastTripsPanelActive?"0%":"100%"
        }}
        >
            <ShowHideToggler toggleHandler={() => setIsMyPastTripsPanelActive(false)} />
            <Heading text="Choose from past trips" fontSize="16px" fontWeight={600} />
            <div className="relative h-[80%]">
                <div className="pointer-events-none absolute top-0 left-0 w-full h-10 bg-linear-to-b from-gray-200 to-transparent z-1"></div>
                <ScrollableContainer height="100%">
                    <InfiniteScroller api={myAllPastRidesPassenger} wholeArray={myPastRides} setWholeArray={setMyPastRides}>
                        {
                            myPastRides.map((ride) => (
                                <div className="mt-5 py-2 rounded-sm" onClick={(e:MouseEvent<HTMLDivElement>) => {
                                        e.preventDefault();
                                        setIsMyPastTripsPanelActive(false);
                                        if (setSelectedVehicleType && setIsWaitingPanelActive) {
                                            setSelectedVehicleType(ride.vehicleDetailes.vehicleType);
                                            setIsWaitingPanelActive(true);
                                        }
                                        createRideRequest({passengerID:ride.passengerID as string, pickupLocation:ride.pickupLocation, dropoffLocation:ride.dropoffLocation, vehicleType:ride.vehicleDetailes.vehicleType});
                                }}>
                                    <CarListItem allFare={{
                                        uberAuto:ride.fare,
                                        uberComfort:ride.fare,
                                        uberHCV:ride.fare,
                                        uberMoto:ride.fare,
                                        uberPool:ride.fare,
                                        uberXL:ride.fare,
                                        uberScooty:ride.fare,
                                        uberX:ride.fare
                                    }} vehicleCapacity={vehicleCapacity[ride.vehicleDetailes?.vehicleType]} vehicleDescription={vehicleDescription[ride.vehicleDetailes?.vehicleType]} vehicleImg={vehicleImages[ride.vehicleDetailes?.vehicleType]} vehicleType={ride.vehicleDetailes?.vehicleType} />
                                    <Location highlightAddress="Ho.No.371" fullAddress={ride.pickupLocation.address} />
                                    <Location highlightAddress="Shop No.22" fullAddress={ride.dropoffLocation.address} />
                                </div>

                            ))
                        }
                    </InfiniteScroller>
                </ScrollableContainer>
                <div className="pointer-events-none absolute bottom-0 left-0 w-full h-10 bg-linear-to-t from-gray-200 to-transparent z-1"></div>
            </div>



        </div>
    )
};

export default PastTripsPanel;