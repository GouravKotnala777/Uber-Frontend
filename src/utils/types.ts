
export interface UserTypes {
    _id:string;
    name:string;
    email:string;
    //password:string;
    mobile:string;
    gender:"male"|"female"|"other";
    role:"user"|"admin";
};
export type VehicleTypeTypes = "car"|"motorcycle"|"auto";
export interface DriverTypes {
    _id:string;
    userID:string;
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
export interface ResponseType<J> {
    success:boolean;
    message:string;
    jsonData:J;
};