import { AcceptRideRequestBodyTypes, CreateRideRequestBodyTypes, RegisterBodyTypes, RegisterDriverBodyTypes, ResponseType, StartRideBodyTypes, VehicleTypeTypes } from "./utils/types";

// Function for user registration
export const register = async(registerFormData:RegisterBodyTypes) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/register`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify(registerFormData)
        });
        
        const resolvedData = await res.json();
        console.log("::::::::::::::::::::: 1");
        console.log(resolvedData);
        console.log("::::::::::::::::::::: 2");
        
        return resolvedData as ResponseType<typeof resolvedData.jsonData>;
    } catch (error) {
        console.log("::::::::::::::::::::: 1");
        console.log(error);
        console.log("::::::::::::::::::::: 2");
        return error as ResponseType<typeof error>;
    }
};
// Function for user login
export const login = async(loginFormData:Pick<RegisterBodyTypes, "email"|"password">) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/login`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify(loginFormData)
        });
        const resolvedData = await res.json();
        console.log("::::::::::::::::::::: 1");
        console.log(resolvedData);
        console.log("::::::::::::::::::::: 2");
        
        return resolvedData as ResponseType<typeof resolvedData.jsonData>;
    } catch (error) {
        console.log("::::::::::::::::::::: 1");
        console.log(error);
        console.log("::::::::::::::::::::: 2");
        return error as ResponseType<typeof error>;
    }
};
// Function for fetch my profile
export const myProfile = async() => {
    try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/me`, {
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include"
        });
        const resolvedData = await res.json();
        console.log("::::::::::::::::::::: 1");
        console.log(resolvedData);
        console.log("::::::::::::::::::::: 2");
        
        return resolvedData as ResponseType<typeof resolvedData.jsonData>;
    } catch (error) {
        console.log("::::::::::::::::::::: 1");
        console.log(error);
        console.log("::::::::::::::::::::: 2");
        return error as ResponseType<typeof error>;
    }
};
// Function for register driver
export const registerDriver = async(registerDriverFormData:RegisterDriverBodyTypes) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/driver/register`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify(registerDriverFormData)
        });
        const resolvedData = await res.json();
        console.log("::::::::::::::::::::: 1");
        console.log(resolvedData);
        console.log("::::::::::::::::::::: 2");
        
        return resolvedData as ResponseType<typeof resolvedData.jsonData>;
    } catch (error) {
        console.log("::::::::::::::::::::: 1");
        console.log(error);
        console.log("::::::::::::::::::::: 2");
        return error as ResponseType<typeof error>;
    }
};
// Function for fetch my profile as driver
export const myDriverProfile = async() => {
    try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/driver/me`, {
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include"
        });
        const resolvedData = await res.json();
        console.log("::::::::::::::::::::: 1");
        console.log(resolvedData);
        console.log("::::::::::::::::::::: 2");
        
        return resolvedData as ResponseType<typeof resolvedData.jsonData>;
    } catch (error) {
        console.log("::::::::::::::::::::: 1");
        console.log(error);
        console.log("::::::::::::::::::::: 2");
        return error as ResponseType<typeof error>;
    }
};
// Function for fetch location suggestions
export const getSuggestions = async(suggestionsQueryData:string) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/map/get-suggestions?input=${suggestionsQueryData}`, {
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include"
        });
        const resolvedData = await res.json();
        console.log("::::::::::::::::::::: 1");
        console.log(resolvedData);
        console.log("::::::::::::::::::::: 2");
        
        return resolvedData as ResponseType<typeof resolvedData.jsonData>;
    } catch (error) {
        console.log("::::::::::::::::::::: 1");
        console.log(error);
        console.log("::::::::::::::::::::: 2");
        return error as ResponseType<typeof error>;
    }
};

// Function for fetch all nearby available drivers
export const allNearbyDrivers = async({radius, address}:{radius:string; address:string;}) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/driver/nearbyDrivers?radius=${radius}&address=${address}`, {
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",

        });
        const resolvedData = await res.json();
        console.log("::::::::::::::::::::: 1");
        console.log(resolvedData);
        console.log("::::::::::::::::::::: 2");
        
        return resolvedData as ResponseType<typeof resolvedData.jsonData>;
    } catch (error) {
        console.log("::::::::::::::::::::: 1");
        console.log(error);
        console.log("::::::::::::::::::::: 2");
        return error as ResponseType<typeof error>;
    }
};
// Function for fetch coordinates of an address
export const getCoordinates = async({address}:{address:string;}) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/map/get-coordinates?address=${address}`, {
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include"
        });
        const resolvedData = await res.json();
        console.log("::::::::::::::::::::: 1");
        console.log(resolvedData);
        console.log("::::::::::::::::::::: 2");
        
        return resolvedData as ResponseType<typeof resolvedData.jsonData>;
    } catch (error) {
        console.log("::::::::::::::::::::: 1");
        console.log(error);
        console.log("::::::::::::::::::::: 2");
        return error as ResponseType<typeof error>;
    }
};
// Function for create ride request
export const createRideRequest = async(createRideRequestFormData:CreateRideRequestBodyTypes) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/ride/create`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify(createRideRequestFormData)
        });
        const resolvedData = await res.json();
        console.log("::::::::::::::::::::: 1");
        console.log(resolvedData);
        console.log("::::::::::::::::::::: 2");
        
        return resolvedData as ResponseType<typeof resolvedData.jsonData>;
    } catch (error) {
        console.log("::::::::::::::::::::: 1");
        console.log(error);
        console.log("::::::::::::::::::::: 2");
        return error as ResponseType<typeof error>;
    }
};
// Function for accept ride request
export const acceptRideRequest = async(acceptRideRequestFormData:AcceptRideRequestBodyTypes) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/ride/accept`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify(acceptRideRequestFormData)
        });
        const resolvedData = await res.json();
        console.log("::::::::::::::::::::: 1");
        console.log(resolvedData);
        console.log("::::::::::::::::::::: 2");
        
        return resolvedData as ResponseType<typeof resolvedData.jsonData>;
    } catch (error) {
        console.log("::::::::::::::::::::: 1");
        console.log(error);
        console.log("::::::::::::::::::::: 2");
        return error as ResponseType<typeof error>;
    }
};
// Function for start ride by filling OTP by driver
export const startRide = async(startRideFormData:StartRideBodyTypes) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/ride/start`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify(startRideFormData)
        });
        const resolvedData = await res.json();
        console.log("::::::::::::::::::::: 1");
        console.log(resolvedData);
        console.log("::::::::::::::::::::: 2");
        
        return resolvedData as ResponseType<typeof resolvedData.jsonData>;
    } catch (error) {
        console.log("::::::::::::::::::::: 1");
        console.log(error);
        console.log("::::::::::::::::::::: 2");
        return error as ResponseType<typeof error>;
    }
};
// Function for get fare of trip
export const getFareOfTrip = async(getFareFormData:{dropoffLocation:string; pickupLocation:string;}) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/ride/get-fare`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify(getFareFormData)
        });
        const resolvedData = await res.json();
        console.log("::::::::::::::::::::: 1");
        console.log(resolvedData);
        console.log("::::::::::::::::::::: 2");
        
        return resolvedData as ResponseType<typeof resolvedData.jsonData>;
    } catch (error) {
        console.log("::::::::::::::::::::: 1");
        console.log(error);
        console.log("::::::::::::::::::::: 2");
        return error as ResponseType<typeof error>;
    }
};