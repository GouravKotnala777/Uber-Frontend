import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Start from './pages/Start';
import Home from './pages/Home';
import DriverHome from './pages/DriverHome';
import SingleRide from './pages/SingleRide';
import DriverRegister from './pages/DriverRegister';
//import DriverContext from './contexts/DriverContext';
import { UserContextTypes, UserInitialDataContext } from './contexts/UserContext';
//import SocketContext from './contexts/SocketContext';
import DriverRiding from './pages/DriverRiding';
import Riding from './pages/Riding';
import DriverLogin from './pages/DriverLogin';
import PageNotFound from './pages/PageNotFound';
import ProtectedRouter from './components/ProtectedRouter';
import { useContext, useEffect } from 'react';
import { myDriverProfile, myProfile } from './api';
import { DriverContextTypes, DriverInitialContextData } from './contexts/DriverContext';
import Rides from './pages/dashboard/Rides';
import Logout from './pages/Logout';
import Drivers from './pages/dashboard/Drivers';

function App() {
  const userContext = useContext<UserContextTypes>(UserInitialDataContext);
  const driverContext = useContext<DriverContextTypes>(DriverInitialContextData);

  if (!userContext) {
    // Handle the case where the context is null
    throw new Error("UserInitialDataContext is not provided!");
  };
  if (!driverContext) {
    // Handle the case where the context is null
    throw new Error("DriverInitialContextData is not provided!");
  };

  const {userContextData, setUserContextData} = userContext;
  const {driverContextData, setDriverContextData} = driverContext;

  useEffect(() => {
    myDriverProfile()
    .then((res) => {
        if (res.success) {
          if (setDriverContextData) {
            setDriverContextData({isLoading:false, driver:res.jsonData});
          }
        }
        else{
          if (setDriverContextData) {
            setDriverContextData({isLoading:false, driver:null});
          }
        }
    }).catch((err) => {      
        console.log(err);
    });
    myProfile()
    .then((res) => {
        if (res.success) {
          if (setUserContextData) {            
            setUserContextData({isLoading:false, user:res.jsonData});
          }
        }
        else{
          if (setUserContextData) {            
            setUserContextData({isLoading:false, user:null});
          }
        }
    }).catch((err) => {
        console.log(err);
    });
  }, []);

  return (
    
          <BrowserRouter>
            {/*<pre>{JSON.stringify(driverContextData, null, `\t`)}</pre>*/}
            {/*<nav style={{border:"2px solid white", width:"100%"}}><NavLink to={"/user/register"}>Register</NavLink><NavLink to={"/user/login"}>Login</NavLink> </nav>*/}
            <Routes>
              <Route path="/" element={<Start />} />
              {/*<Route path="/user/home" element={<Home />} />*/}
              {
                !userContextData.user?._id &&
                  <>
                    <Route path="/user/register" element={<Register />} />
                    <Route path="/user/login" element={<Login />} />
                  </>
              }
              {/*<Route path="/user/riding" element={<Riding />} />*/}
              {/*<Route path="/driver/home" element={<DriverHome />} />*/}
              {
                !driverContextData.driver?._id &&
                  <>
                    <Route path="/driver/register" element={<DriverRegister />} />
                    <Route path="/driver/login" element={<DriverLogin />} />
                  </>
              }
              {/*<Route path="/driver/riding" element={<DriverRiding />} />*/}
              <Route path="/driver/singleRide" element={<SingleRide />} />



              <Route path="/user/home" element={<ProtectedRouter isLoading={userContextData.isLoading} children={<Home />} accessibleFor="user" userType={userContextData.user?.role as string} />} />
              <Route path="/user/riding" element={<ProtectedRouter isLoading={userContextData.isLoading} children={<Riding />} accessibleFor="user" userType={userContextData.user?.role as string} />} />
              <Route path="/driver/home" element={<ProtectedRouter isLoading={driverContextData.isLoading} children={<DriverHome />} accessibleFor="user" userType={driverContextData.driver?.userID?.role as string} />} />
              <Route path="/driver/riding" element={<ProtectedRouter isLoading={driverContextData.isLoading} children={<DriverRiding />} accessibleFor="user" userType={driverContextData.driver?.userID?.role as string} />} />

              {
                (driverContextData.driver?._id ||
                userContextData.user?._id) &&
                  <Route path="/logout" element={<Logout />} />
              }

              <Route path="/admin/dashboard/rides" element={<Rides />} />
              <Route path="/admin/dashboard/drivers" element={<Drivers />} />

              <Route path="/*" element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>
        
  )
}

export default App
