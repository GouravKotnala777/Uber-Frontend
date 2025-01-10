import { VehicleTypeTypes } from "./types";

export const VEHICLE_TYPES_ARRAY:VehicleTypeTypes[] = ["uberX", "uberComfort", "uberXL", "uberPool", "uberMoto", "uberScooty","uberAuto", "uberHCV"];
export const vehicleDescription = { uberAuto: "Affordable three-wheeler",
    uberX: "Affordable compact",
    uberScooty: "Quick and economical two-wheeler",
    uberMoto: "Convenient and fast bike ride",
    uberComfort: "Premium comfort and space",
    uberHCV: "Heavy commercial vehicle for goods",
    uberPool: "Shared ride for lower cost",
    uberXL: "Spacious ride for groups or large luggage"
};
export const vehicleCapacity = {uberAuto:5, uberX:3, uberMoto:1, uberScooty:1, uberComfort:3, uberHCV:5, uberPool:3, uberXL:4};


// socket events name
export const NEW_CONNECTION = "connection";
export const JOIN = "join";
export const UPDATE_DRIVER_LOCATION = "update-driver-location";
export const SEND_LOCATION_TO_PASSENGER = "send-location-to-passenger";
export const NEW_RIDE = "new-ride";
export const RIDE_ACCEPTED = "ride-accepted";
export const RIDE_STARTED = "ride-started";
export const RIDE_ENDED = "ride-ended";
export const RIDE_CANCELLED = "ride-cancelled";
export const NEW_MESSAGE = "new-message";
export const DISCONNECT = "disconnect";