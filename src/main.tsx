import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import "./styles/app.scss";
import SocketContext from './contexts/SocketContext.tsx';
import UserContext from './contexts/UserContext.tsx';
import DriverContext from './contexts/DriverContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SocketContext>
      <UserContext>
        <DriverContext>
    <App /></DriverContext>
      </UserContext>
    </SocketContext>
  </StrictMode>,
)
