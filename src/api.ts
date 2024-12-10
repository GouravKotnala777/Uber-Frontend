import { RegisterBodyTypes, ResponseType } from "./utils/types";


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