import { ChangeEvent, useState } from "react";
import { ScrollableContainer } from "../../components/WrapperContainers";
import { getAllDrivers } from "../../api";
import { PieChart, StackedBarChart } from "../../components/charts/Charts";
import { DriverTypesPopulated } from "../../utils/types";

const driverAvailablityCategory:Record<string, string> = {
    true:"green",
    false:"red"
};

const Drivers = () => {
    const [formData, setFormData] = useState<{
        rating?:string; availabilityStatus?:string; fromDate?:string; upToDate?:string;
    }>({availabilityStatus:"", fromDate:"", upToDate:"", rating:""});
    const [allDrivers, setAllDrivers] = useState<{allDriversByQueries:DriverTypesPopulated[], driversAvailablity:{available:number; unavailable:number;}, driversGender:{male:number; female:number; other:number;}, driverRatings:{
        "0 star":number;
        "1 star":number;
        "2 stars":number;
        "3 stars":number;
        "4 stars":number;
        "5 stars":number;
    }}>({allDriversByQueries:[],driversAvailablity:{available:0, unavailable:0}, driversGender:{male:0, female:0, other:0}, driverRatings:{"0 star":0,"1 star":0,"2 stars":0,"3 stars":0,"4 stars":0,"5 stars":0}});

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
        setFormData({...formData, [e.target.name]:e.target.value});
    };
    const fetchAllDriversHandler = async() => {
        const allFilteredDrivers = await getAllDrivers(formData);
        if (allFilteredDrivers.success) {
            setAllDrivers(allFilteredDrivers.jsonData);
        }
    };

    return(
        <div className="rides_dashboard_bg">
            <ScrollableContainer height="100vh">
                {/*<pre>{JSON.stringify(allDrivers.map((item) => ({date:item.createdAt, category:item.vehicleDetailes?.vehicleType, price:10})), null, `\t`)}</pre>*/}
                <input type="text" name="rating" placeholder="Rating" onChange={(e) => onChangeHandler(e)}/>
                <input type="date" name="fromDate" placeholder="from date" onChange={(e) => onChangeHandler(e)}/>
                <input type="date" name="upToDate" placeholder="up to date" onChange={(e) => onChangeHandler(e)}/>
                <select name="availabilityStatus" onChange={(e) => onChangeHandler(e)}>
                    <option value="">All</option>
                    <option value="true">Available</option>
                    <option value="false">Not available</option>
                </select>
                <button onClick={fetchAllDriversHandler}>Fetch Data</button>
                <StackedBarChart data={allDrivers.allDriversByQueries.map((item) => ({date:new Date(item.createdAt).toLocaleDateString(undefined, {day:"numeric", month:"short"}), category:item.availabilityStatus.toString(), price:0.1}))} categoryColors={driverAvailablityCategory} />
                <PieChart data={allDrivers.driverRatings} colorScheme={["#4caf50", "#8bc34a", "#cddc39", "#ffc107", "#f44336", "#919191"]} />
                <PieChart data={allDrivers.driversAvailablity} colorScheme={["#4caf50", "#8bc34a"]} />
                <PieChart data={allDrivers.driversGender} colorScheme={["red", "blue", "green"]} />
            </ScrollableContainer>
        </div>
    )
};

export default Drivers;