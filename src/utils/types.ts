
export interface UserTypes {
    _id:string;
    name:string;
    email:string;
    //password:string;
    mobile:string;
    gender:"male"|"female"|"other";
    role:"user"|"admin";
};

export interface RegisterBodyTypes extends Pick<UserTypes, "email"|"mobile"|"gender"> {
    firstName:string;
    lastName:string;
    password:string;
};
export interface ResponseType<J> {
    success:boolean;
    message:string;
    jsonData:J;
};