import { AcceptRideRequestBodyTypes, CreateChatBodyType, CreatePaymentFormTypes, CreateRideRequestBodyTypes, RegisterBodyTypes, RegisterDriverBodyTypes, ResponseType, ReviewTypes, RideTypes, StartRideBodyTypes, UserTypes } from "./utils/types";
import { redirectAfterToast } from "./utils/utilityFunctions";

// Function for user registration
export const register = async(registerFormData:RegisterBodyTypes) => {
    console.log("AAAAAAAAAAAAAAAAAAAA");
    console.log({url:`${import.meta.env.VITE_SERVER_URL}/api/v1/user/register`});
    
    try {
        console.log(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/register`);
        
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
// Function for user verification
export const verifyUser = async({otp}:{otp:string;}) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/verify`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify({otp})
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
// Function to update my profile
export const updateMyProfile = async(updateMyProfileFormData:Partial<Pick<UserTypes, "name"|"mobile"|"gender">>&{password?:string; oldPassword:string;}) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/update`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify(updateMyProfileFormData)
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
// Function to post/update my profile image
export const uploadProfileImage = async(formData:FormData) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/upload-image`, {
            method:"POST",
            credentials:"include",
            body:formData
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
// Function to remove my profile image
export const removeProfileImage = async() => {
    try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/remove-image`, {
            method:"POST",
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
// Function for user logout
export const logout = async() => {
    try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/logout`, {
            method:"POST",
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
// Function for fetch all drivers
export const getAllDrivers = async(getAllDriversFormData:{
    rating?:string; availabilityStatus?:string; fromDate?:string; upToDate?:string;
}) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/driver/all?availabilityStatus=${getAllDriversFormData.availabilityStatus}&fromDate=${getAllDriversFormData.fromDate}&upToDate=${getAllDriversFormData.upToDate}&rating=${getAllDriversFormData.rating}`, {
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
// Function for driver login
export const loginDriver = async(loginFormData:Pick<RegisterBodyTypes&RegisterDriverBodyTypes, "email"|"password"|"licenseNumber"|"vehicleNumber">) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/driver/login`, {
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
// Function for user verification
export const verifyDriver = async({otp}:{otp:string;}) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/driver/verify`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify({otp})
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
// Function to update my driving profile
export const updateMyDrivingProfile = async(updateMyDrivingProfileFormData:{licenseNumber?:string; vehicleColor?:string; vehicleModel?:string; vehicleNumber?:string; vehicleType?:string; availabilityStatus?:boolean;}) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/driver/update`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify(updateMyDrivingProfileFormData)
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
// Function to post/update driver profile image
export const uploadDriverProfileImage = async(formData:FormData) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/driver/upload-image`, {
            method:"POST",
            credentials:"include",
            body:formData
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
// Function to remove driver profile image
export const removeDriverProfileImage = async() => {
    try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/driver/remove-image`, {
            method:"POST",
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
// Function for driver logout
export const logoutDriver = async() => {
    try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/driver/logout`, {
            method:"POST",
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
        if (!address) {
            redirectAfterToast({res:{success:false, message:"Bad request", jsonData:{}}})
            throw new Error(JSON.stringify({address}));
        }
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
// Function for fetch all rides
export const getAllRides = async(getAllRidesFormData:Partial<Pick<RideTypes, "driverID">>&{
    createdAt?:string;
    status?:string;
    pickUpLatitude?:string;
    pickUpLongitude?:string;
    dropoffLatitude?:string;
    dropoffLongitude?:string;
    startDate?:string;
    endDate?:string;
}) => {
    try {
        //if (!getAllRidesFormData.driverID && !getAllRidesFormData.pickUpLatitude && !getAllRidesFormData.pickUpLongitude && !getAllRidesFormData.dropoffLatitude && !getAllRidesFormData.dropoffLongitude && !getAllRidesFormData.status && !getAllRidesFormData.createdAt) {
        //    redirectAfterToast({res:{success:false, message:"Bad request", jsonData:{}}})
        //    throw new Error(JSON.stringify(getAllRidesFormData));
        //}
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/ride/all?driverID=${getAllRidesFormData.driverID}&pickUpLatitude=${getAllRidesFormData.pickUpLatitude}&pickUpLongitude=${getAllRidesFormData.pickUpLongitude}&dropoffLatitude=${getAllRidesFormData.dropoffLatitude}&dropoffLongitude=${getAllRidesFormData.dropoffLongitude}&status=${getAllRidesFormData.status}&createdAt=${getAllRidesFormData.createdAt}&startDate=${getAllRidesFormData.startDate}&endDate=${getAllRidesFormData.endDate}`, {
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
// Function for fetch my all rides as passenger (except with requested status)
export const myAllPastRidesPassenger = async(skip:number) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/ride/passenger/my-rides?skip=${skip}`, {
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
// Function for fetch my all unique rides as passenger
export const myAllUniqueRidesPassenger = async() => {
    try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/ride/passenger/my-unique-rides`, {
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
// Function for fetch my all rides as driver (except with requested status)
export const myAllPastRidesDriver = async() => {
    try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/ride/driver/my-rides`, {
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
        if (!createRideRequestFormData.pickupLocation || !createRideRequestFormData.dropoffLocation || !createRideRequestFormData.passengerID) {
            redirectAfterToast({res:{success:false, message:"Bad request", jsonData:{}}})
            throw new Error(JSON.stringify(createRideRequestFormData));
        }
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
        if (!acceptRideRequestFormData.rideID || !acceptRideRequestFormData.status) {
            redirectAfterToast({res:{success:false, message:"Bad request", jsonData:{}}})
            throw new Error(JSON.stringify(acceptRideRequestFormData));
        }
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
        if (!startRideFormData.otp || !startRideFormData.rideID) {
            redirectAfterToast({res:{success:false, message:"Bad request", jsonData:{}}})
            throw new Error(JSON.stringify(startRideFormData));
        }
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
// Function for end ride by driver
export const endRide = async({rideID}:{rideID:string}) => {
    try {
        if (!rideID) {
            redirectAfterToast({res:{success:false, message:"Bad request", jsonData:{}}})
            throw new Error(JSON.stringify({rideID}));
        }
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/ride/end`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify({rideID})
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
// Function for cancel ride by driver
export const cancelRide = async({rideID}:{rideID:string}) => {
    try {
        if (!rideID) {
            redirectAfterToast({res:{success:false, message:"Bad request", jsonData:{}}})
            throw new Error(JSON.stringify({rideID}));
        }
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/ride/cancel`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify({rideID})
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
        if (!getFareFormData.pickupLocation || !getFareFormData.dropoffLocation) {
            redirectAfterToast({res:{success:false, message:"Bad request", jsonData:{}}})
            throw new Error(JSON.stringify(getFareFormData));
        }
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
// Function for create new chat for user
export const createChat = async({receiver, content, senderType, receiverSocketID}:CreateChatBodyType) => {
    try {
        if (!receiver || !content || !senderType || !receiverSocketID) {
            redirectAfterToast({res:{success:false, message:"Bad request", jsonData:{}}})
            throw new Error(JSON.stringify({receiver, content, senderType, receiverSocketID}));
        }
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/chat/${senderType}/message/create`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify({receiver, content, senderType, receiverSocketID})
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
// Function for create new payment from user
export const createPayment = async({rideID, amount, paymentMethod, paymentStatus}:CreatePaymentFormTypes) => {
    try {
        if (!rideID || !amount || !paymentMethod || !paymentStatus) {
            redirectAfterToast({res:{success:false, message:"Bad request", jsonData:{}}})
            throw new Error(JSON.stringify({rideID, amount, paymentMethod, paymentStatus}));
        }
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/payment/create`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify({rideID, amount, paymentMethod, paymentStatus})
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
// Function to find my reviews
export const findDriverAllReviews = async({driverID, rideID}:{driverID:string; rideID:string;}) => {
    try {
        if (!driverID || !rideID) {
            redirectAfterToast({res:{success:false, message:"Bad request", jsonData:{}}})
            throw new Error(JSON.stringify({driverID, rideID}));
        }
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/review/my?driverID=${driverID}&rideID=${rideID}`, {
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
// Function to create/update review
export const createReview = async({driverID, rideID, rating, comment}:Pick<ReviewTypes, "driverID"|"rideID"|"rating"|"comment">) => {
    try {
        if (!driverID || !rideID || !rating) {
            redirectAfterToast({res:{success:false, message:"Bad request", jsonData:{}}})
            throw new Error(JSON.stringify({driverID, rideID, rating}));
        }
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/review/create`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify({driverID, rideID, rating, comment})
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
