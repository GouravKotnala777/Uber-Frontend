import { createContext, Dispatch, FC, ReactNode, SetStateAction, useState } from "react";
import { UserTypes } from "../utils/types";


export interface UserContextTypes {
    userContextData:{
        isLoading:boolean;
        user:UserTypes|null;
    };
    setUserContextData?:Dispatch<SetStateAction<{
        isLoading:boolean;
        user:UserTypes|null;
    }>>;
    updateUser?:(userPayload:{
        isLoading:boolean;
        user:UserTypes|null;
    }) => void;
};

export const UserInitialDataContext = createContext<UserContextTypes>({
    userContextData:{
        isLoading:true,
        user:null
    }
});

interface UserContextPropType {
    children:ReactNode;
}

const UserContext:FC<UserContextPropType> = ({children}) => {
    const [userContextData, setUserContextData] = useState<{
        isLoading:boolean;
        user:UserTypes|null;
    }>({
        isLoading:true,
        user:null
    });

    const updateUser = (userPayload:{
        isLoading:boolean;
        user:UserTypes|null;
    }) => {
        setUserContextData(userPayload);
    };

    const value:UserContextTypes = {
        userContextData,
        setUserContextData,
        updateUser
    };

    return(
        <UserInitialDataContext.Provider value={value}>
            {children}
        </UserInitialDataContext.Provider>
    )
};

export default UserContext;