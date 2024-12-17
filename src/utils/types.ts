
export interface UserTypes {
    _id:string;
    name:string;
    email:string;
    //password:string;
    mobile:string;
    gender:"male"|"female"|"other";
    role:"user"|"admin";
    socketID:string;
};
export type VehicleTypeTypes = "car"|"motorcycle"|"auto";
export interface DriverTypes {
    _id:string;
    userID:UserTypes;
    licenseNumber:string;
    vehicleDetailes:{
        vehicleType:VehicleTypeTypes;
        vehicleModel:string;
        vehicleNumber:string;
        vehicleColor:string;
    },
    availabilityStatus:boolean;
    rating:number;
    createdAt:Date;
    updatedAt:Date;
};
export interface DriverTypesPopulated {
    _id:string;
    userID:Pick<UserTypes, "_id"|"name"|"email"|"gender"|"mobile"|"role"|"socketID">;
    licenseNumber:string;
    vehicleDetailes:{
        vehicleType:VehicleTypeTypes;
        vehicleModel:string;
        vehicleNumber:string;
        vehicleColor:string;
    },
    availabilityStatus:boolean;
    rating:number;
    createdAt:Date;
    updatedAt:Date;
};

export interface RegisterBodyTypes extends Pick<UserTypes, "email"|"mobile"|"gender"> {
    firstName:string;
    lastName:string;
    password:string;
};
export interface RegisterDriverBodyTypes extends Pick<DriverTypes, "licenseNumber"|"userID"> {
    vehicleColor:string;
    vehicleModel:string;
    vehicleNumber:string;
    vehicleType:VehicleTypeTypes;
    password:string;
};
export type RideStatusTypes = "requested"|"accepted"|"in-progress"|"completed"|"cancelled";
export interface LocationTypes {
    latitude:number;
    longitude:number;
    address:string;
};
export interface RideTypes {
    _id:string;
    driverID:string;
    passengerID:string;
    pickupLocation:LocationTypes;
    dropoffLocation:LocationTypes;
    distance:number;
    fare:number;
    duration:number;
    status:RideStatusTypes;
    paymentID:string;
    orderID:string;
    signature:string;
    otp:string;
    createdAt:Date;
    updatedAt:Date;
};
export interface CreateRideRequestBodyTypes extends Pick<RideTypes, "passengerID"|"pickupLocation"|"dropoffLocation"> {
    vehicleType:VehicleTypeTypes;
};
export interface AcceptRideRequestBodyTypes extends Pick<RideTypes, "status"|"driverID"> {
    rideID:string;
};
export interface ResponseType<J> {
    success:boolean;
    message:string;
    jsonData:J;
};