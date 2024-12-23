import {LoadScript, GoogleMap, Marker} from "@react-google-maps/api";
import { useEffect, useState } from "react";

const containerStyle = {
    width:"100%",
    height:"400px"
};

const center = {
    lat:28.4354267,
    lng:77.3143303,
};

const LiveTracking = () => {
    const [currentPosition, setCurrentPosition] = useState(center);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const {latitude, longitude} = position.coords;

            setCurrentPosition({lat:latitude, lng:longitude});

        });
        const watchID = navigator.geolocation.watchPosition((position) => {
            const {latitude, longitude} = position.coords;

            setCurrentPosition({lat:latitude, lng:longitude});

        });

        return() => navigator.geolocation.clearWatch(watchID);
    }, []);

    useEffect(() => {
        const updatePosition = () => {
            navigator.geolocation.getCurrentPosition((position) => {
                const {latitude, longitude} = position.coords;
                setCurrentPosition({lat:latitude, lng:longitude});
            });
        };

        updatePosition();

        const interValid = setInterval(updatePosition, 20000);

        return() => clearInterval(interValid);
    }, []);

    return(
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GGGG}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={currentPosition}
                zoom={15}
            >
                <Marker position={currentPosition} />
            </GoogleMap>
        </LoadScript>
        //<div className="live_tracking_cont">

        //</div>
    )
};

export default LiveTracking;