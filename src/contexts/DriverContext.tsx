import { createContext, useState, ReactNode, Dispatch, SetStateAction } from "react";
import { DriverTypesPopulated } from "../utils/types";

// Define the shape of the context value
export interface DriverContextTypes {
  driver: DriverTypesPopulated | null;
  setDriver: Dispatch<SetStateAction<DriverTypesPopulated | null>>;
  updateDriver: (driverPayload: DriverTypesPopulated | null) => void;
}

// Create the context with the correct type
export const DriverDataContext = createContext<DriverContextTypes | null>(null);

interface DriverContextProps {
  children: ReactNode; // Properly typing the children prop
}

const DriverContext: React.FC<DriverContextProps> = ({ children }) => {
  const [driver, setDriver] = useState<DriverTypesPopulated | null>(null);

  const updateDriver = (driverPayload: DriverTypesPopulated | null) => {
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
