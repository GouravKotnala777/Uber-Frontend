import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {

  return (
    <BrowserRouter>
      {/*<nav style={{border:"2px solid white", width:"100%"}}><NavLink to={"/user/register"}>Register</NavLink><NavLink to={"/user/login"}>Login</NavLink> </nav>*/}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/register" element={<Register />} />
        <Route path="/user/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
