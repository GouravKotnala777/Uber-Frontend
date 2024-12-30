
export interface UserTypes {
    _id:string;
    name:string;
    email:string;
    //password:string;
    mobile:string;
    gender:"male"|"female"|"other";
    role:"user"|"admin";
    socketID:string;
    image?:string;
};
export type VehicleTypeTypes = "uberAuto"|"uberX"|"uberMoto"|"uberScooty"|"uberComfort"|"uberHCV"|"uberPool"|"uberXL";
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
    image?:string;
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
    image?:string;
    createdAt:Date;
    updatedAt:Date;
};

export interface RegisterBodyTypes extends Pick<UserTypes, "email"|"mobile"|"gender"> {
    firstName:string;
    lastName:string;
    password:string;
};
export interface RegisterDriverBodyTypes extends Pick<DriverTypes, "licenseNumber"> {
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
export interface AcceptRideRequestBodyTypes extends Pick<RideTypes, "status"> {
    rideID:string;
};
export interface StartRideBodyTypes extends Pick<RideTypes, "otp"> {
    rideID:string;
};
export interface ResponseType<J> {
    success:boolean;
    message:string;
    jsonData:J;
};
export interface ChatTypes{
    sender:string;
    receiver:string;
    content:string;
    createdAt:Date;
}
export interface CreateChatBodyType extends Pick<ChatTypes, "receiver"|"content">{
    senderType:"user"|"driver";
    receiverSocketID:string;
};
export type PaymentMethodTypes = "cash"|"card"|"wallet";
export type PaymentStatusTypes = "pending"|"completed"|"failed";
export interface PaymentTypes{
    _id:string;
    rideID:string;
    amount:number;
    paymentMethod:PaymentMethodTypes;
    paymentStatus:PaymentStatusTypes;
    createdAt:Date;
    updatedAt:Date;
};
export type CreatePaymentFormTypes = Pick<PaymentTypes, "rideID"|"amount"|"paymentMethod"|"paymentStatus">;