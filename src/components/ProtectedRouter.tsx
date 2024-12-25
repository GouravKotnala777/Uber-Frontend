import { ReactElement } from "react";
import PageNotFound from "../pages/PageNotFound";
import Login from "../pages/Login";
import LoadingPage from "../pages/LoadingPage";


const ProtectedRouter = ({isLoading, children, accessibleFor, userType}:{isLoading:boolean; children:ReactElement; accessibleFor:string; userType:string;}) => {
    if (isLoading) {
        return <LoadingPage />
    }
    else{
        if (!userType) {
            return <Login />
        }
        if (userType !== accessibleFor) {
            return <PageNotFound />;
        }
    }
    return children;
};

export default ProtectedRouter;