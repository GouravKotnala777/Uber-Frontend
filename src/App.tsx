import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Register from './pages/Register';
import Login from './pages/Login';
import Start from './pages/Start';
import Home from './pages/Home';
import DriverHome from './pages/DriverHome';
import SingleRide from './pages/SingleRide';
import DriverRegister from './pages/DriverRegister';
import DriverContext from './contexts/DriverContext';
import UserContext from './contexts/UserContext';
import SocketContext from './contexts/SocketContext';
import DriverRiding from './pages/DriverRiding';
import Riding from './pages/Riding';
import DriverLogin from './pages/DriverLogin';

function App() {

  return (
    <SocketContext>
      <UserContext>
        <DriverContext>
          <BrowserRouter>
            {/*<nav style={{border:"2px solid white", width:"100%"}}><NavLink to={"/user/register"}>Register</NavLink><NavLink to={"/user/login"}>Login</NavLink> </nav>*/}
            <Routes>
              <Route path="/" element={<Start />} />
              <Route path="/user/home" element={<Home />} />
              <Route path="/user/register" element={<Register />} />
              <Route path="/user/login" element={<Login />} />
              <Route path="/user/riding" element={<Riding />} />
              <Route path="/driver/home" element={<DriverHome />} />
              <Route path="/driver/register" element={<DriverRegister />} />
              <Route path="/driver/login" element={<DriverLogin />} />
              <Route path="/driver/riding" element={<DriverRiding />} />
              <Route path="/driver/singleRide" element={<SingleRide />} />
            </Routes>
          </BrowserRouter>
        </DriverContext>
      </UserContext>
    </SocketContext>
  )
}

export default App
