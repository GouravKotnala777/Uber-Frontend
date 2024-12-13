import { createContext, useState, ReactNode, Dispatch, SetStateAction } from "react";
import { DriverTypes } from "../utils/types";

// Define the shape of the context value
export interface DriverContextTypes {
  driver: DriverTypes | null;
  setDriver: Dispatch<SetStateAction<DriverTypes | null>>;
  updateDriver: (driverPayload: DriverTypes | null) => void;
}

// Create the context with the correct type
export const DriverDataContext = createContext<DriverContextTypes | null>(null);

interface DriverContextProps {
  children: ReactNode; // Properly typing the children prop
}

const DriverContext: React.FC<DriverContextProps> = ({ children }) => {
  const [driver, setDriver] = useState<DriverTypes | null>(null);

  const updateDriver = (driverPayload: DriverTypes | null) => {
    setDriver(driverPayload);
  };

  const value: DriverContextTypes = {
    driver,
    setDriver,
    updateDriver
  };

  return (
    <DriverDataContext.Provider value={value}>
      {children}
    </DriverDataContext.Provider>
  );
};

export default DriverContext;
