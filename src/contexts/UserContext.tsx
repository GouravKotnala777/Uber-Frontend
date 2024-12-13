import { createContext, Dispatch, FC, ReactNode, SetStateAction, useState } from "react";
import { UserTypes } from "../utils/types";


export interface UserContextTypes {
    user:UserTypes|null;
    setUser:Dispatch<SetStateAction<UserTypes|null>>;
    updateUser:(userPayload:UserTypes|null) => void;
};

export const UserDataContext = createContext<UserContextTypes|null>(null);

interface UserContextPropType {
    children:ReactNode;
}

const UserContext:FC<UserContextPropType> = ({children}) => {
    const [user, setUser] = useState<UserTypes|null>(null);

    const updateUser = (userPayload:UserTypes|null) => {
        setUser(userPayload);
    };

    const value:UserContextTypes = {user, setUser, updateUser};

    return(
        <UserDataContext.Provider value={value}>
            {children}
        </UserDataContext.Provider>
    )
};

export default UserContext;