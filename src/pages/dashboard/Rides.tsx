import "../../styles/pages/dashboard/dashboard.scss";
import Heading from "../../components/Heading";
import { RideStatusTypes, RideTypes, RideTypesPopulated, VehicleTypeTypes } from "../../utils/types";
import { StackedBarChart } from "../../components/charts/Charts";
import { getAllRides } from "../../api";
import { ChangeEvent, useState } from "react";
import { ScrollableContainer } from "../../components/WrapperContainers";


// Color mapping for rideStatus
export const rideStatusColor:Record<RideStatusTypes, string> = {
    requested:"red",
    accepted:"orange",
    "in-progress":"green",
    completed:"pink",
    cancelled:"gray"
};
export const rideVehicleTypeColor:Record<VehicleTypeTypes, string> = {
    uberX:"violet",
    uberXL:"indigo",
    uberAuto:"blue",
    uberComfort:"green",
    uberMoto:"yellow",
    uberScooty:"orange",
    uberPool:"red",
    uberHCV:"pink",
};
//export const rideVehicleTypeColor:Record<VehicleTypeTypes, string> = {
//    uberX:"violet",
//    uberXL:"indigo",
//    uberAuto:"blue",
//    uberComfort:"green",
//    uberMoto:"yellow",
//    uberScooty:"orange",
//    uberPool:"red",
//    uberHCV:"pink",
//};

// Demo data
//const data:DataTypes[] = [
//    {date:"01-01-2025", category:"accepted", price:100},
//    {date:"01-01-2025", category:"cancelled", price:50},
//    {date:"02-01-2025", category:"accepted", price:100},
//    {date:"02-01-2025", category:"accepted", price:60},
//    {date:"02-01-2025", category:"in-progress", price:340},
//    {date:"03-01-2025", category:"accepted", price:100},
//    {date:"03-01-2025", category:"completed", price:100},
//    {date:"03-01-2025", category:"completed", price:45},
//    {date:"04-01-2025", category:"cancelled", price:80},
//    {date:"04-01-2025", category:"accepted", price:250},
//    {date:"05-01-2025", category:"requested", price:600},
//];

const Rides = () => {
    const [rides, setRides] = useState<RideTypesPopulated[]>([]);
    const [ridesFormated, setRidesFormated] = useState<Record<RideStatusTypes, {count:number; totalPrice:number;}>>({
        requested:{count:0, totalPrice:0}, accepted:{count:0, totalPrice:0}, "in-progress":{count:0, totalPrice:0}, cancelled:{count:0, totalPrice:0}, completed:{count:0, totalPrice:0}
    });
    const [ridesFormatedAccVehicle, setRidesFormatedAccVehicle] = useState<Record<VehicleTypeTypes, {count:number; totalPrice:number;}>>({
        uberAuto:{count:0, totalPrice:0}, uberComfort:{count:0, totalPrice:0}, uberHCV:{count:0, totalPrice:0}, uberMoto:{count:0, totalPrice:0}, uberPool:{count:0, totalPrice:0}, uberScooty:{count:0, totalPrice:0}, uberX:{count:0, totalPrice:0}, uberXL:{count:0, totalPrice:0}
    });
    const [form, setForm] = useState<Partial<Pick<RideTypes, "driverID">>&{
        status?:string;
        createdAt?:string;
        pickUpLatitude?:string;
        pickUpLongitude?:string;
        dropoffLatitude?:string;
        dropoffLongitude?:string;
        startDate?:string;
        endDate?:string;
    }>({driverID:"", pickUpLatitude:"", pickUpLongitude:"", dropoffLatitude:"", dropoffLongitude:"", status:"", createdAt:""});


    const changeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [e.target.name]:e.target.value});
    };
    const getAllRidesHandler = async() => {
        const allRides = await getAllRides(form);
        setRides(allRides.jsonData);

        const formatedRes:Record<RideStatusTypes, {count:number; totalPrice:number;}> = {
            requested:{count:0, totalPrice:0}, accepted:{count:0, totalPrice:0}, "in-progress":{count:0, totalPrice:0}, cancelled:{count:0, totalPrice:0}, completed:{count:0, totalPrice:0}
        };
        const formatedResAccVehicle:Record<VehicleTypeTypes, {count:number; totalPrice:number;}> = {
            uberAuto:{count:0, totalPrice:0}, uberComfort:{count:0, totalPrice:0}, uberHCV:{count:0, totalPrice:0}, uberMoto:{count:0, totalPrice:0}, uberPool:{count:0, totalPrice:0}, uberScooty:{count:0, totalPrice:0}, uberX:{count:0, totalPrice:0}, uberXL:{count:0, totalPrice:0}
        };

        (allRides.jsonData as RideTypes[]).forEach((item) => {
            formatedRes[item.status].count += 1,
            formatedRes[item.status].totalPrice += 10
        });
        (allRides.jsonData as RideTypesPopulated[]).forEach((item) => {            
            if (formatedResAccVehicle[item?.vehicleDetailes.vehicleType]) {
                formatedResAccVehicle[item?.vehicleDetailes.vehicleType].count += 1,
                formatedResAccVehicle[item?.vehicleDetailes.vehicleType].totalPrice += 10
            }
        });
        setRidesFormated(formatedRes);
        setRidesFormatedAccVehicle(formatedResAccVehicle);
    };

    //useEffect(() => {
    //    getAllRidesHandler();
    //}, []);

    return(
        <div className="rides_dashboard_bg">
            <ScrollableContainer height="100vh">
                {/*<pre>{JSON.stringify(ridesFormatedAccVehicle, null, `\t`)}</pre>*/}
                <input type="text" name="driverID" placeholder="DriverID" onChange={(e) => changeHandler(e)} />
                <input type="text" name="status" placeholder="Status" onChange={(e) => changeHandler(e)} />
                <input type="text" name="createdAt" placeholder="CreatedAt" onChange={(e) => changeHandler(e)} />
                <input type="text" name="pickUpLatitude" placeholder="Pick Lat" onChange={(e) => changeHandler(e)} />
                <input type="text" name="pickUpLongitude" placeholder="Pick Lon" onChange={(e) => changeHandler(e)} />
                <input type="text" name="dropoffLatitude" placeholder="Drop Lat" onChange={(e) => changeHandler(e)} />
                <input type="text" name="dropoffLongitude" placeholder="Drop Lon" onChange={(e) => changeHandler(e)} />
                <input type="date" name="startDate" onChange={(e) => changeHandler(e)} />
                <input type="date" name="endDate" onChange={(e) => changeHandler(e)} />
                <button onClick={getAllRidesHandler}>Fetch</button>
                <Heading text="All Rides" />
                <StackedBarChart data={rides.map((item) => ({date:new Date(item.createdAt).toLocaleDateString(undefined, {day:"numeric", month:"short"}), category:item.status, price:10}))} categoryColors={rideStatusColor} />
                <div className="ride_status_types">
                    {
                        (["requested", "accepted", "in-progress", "completed", "cancelled"] as RideStatusTypes[]).map((type) => (
                            <div className="status_cont" style={{
                                backgroundColor:rideStatusColor[type],
                                opacity:"0.9"
                            }}>
                                <div className="upper">{type} x {ridesFormated[type].count}</div>
                                <div className="lower">₹ {ridesFormated[type].totalPrice}</div>
                            </div>
                        ))
                    }
                </div>
                <StackedBarChart data={rides.filter((ite) => ite.driverID !== undefined).map((item) => ({date:new Date(item.createdAt).toLocaleDateString(undefined, {day:"numeric", month:"short"}), category:item.vehicleDetailes?.vehicleType, price:10}))} categoryColors={rideVehicleTypeColor} />
                <div className="ride_status_types">
                    {
                        (["uberAuto", "uberComfort", "uberHCV", "uberMoto", "uberPool", "uberScooty", "uberX", "uberXL"] as VehicleTypeTypes[]).map((type) => (
                            <div className="status_cont" style={{
                                backgroundColor:rideVehicleTypeColor[type],
                                opacity:"0.9"
                            }}>
                                <div className="upper">{type} x {ridesFormatedAccVehicle[type].count}</div>
                                <div className="lower">₹ {ridesFormatedAccVehicle[type].totalPrice}</div>
                            </div>
                        ))
                    }
                </div>
                <div className="rides_details_cont">
                    <div className="ride_detailes_cont">

                    </div>
                </div>
                {/*<div className="chart_cont">
                </div>*/}
            </ScrollableContainer>
        </div>
    )
};

export default Rides;