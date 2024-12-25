import { createContext, useState, ReactNode, Dispatch, SetStateAction } from "react";
import { DriverTypesPopulated } from "../utils/types";

// Define the shape of the context value
export interface DriverContextTypes {
  driverContextData:{
    isLoading:boolean;
    driver: DriverTypesPopulated | null;
  }
  setDriverContextData?:Dispatch<SetStateAction<{
    isLoading:boolean;
    driver: DriverTypesPopulated | null;
  }>>;
  updateDriver?:(driverPayload: {
    isLoading:boolean;
    driver: DriverTypesPopulated | null;
  }) => void;
}

// Create the context with the correct type
export const DriverInitialContextData = createContext<DriverContextTypes>({
  driverContextData:{
    isLoading:true,
    driver:null
  }
});

interface DriverContextProps {
  children: ReactNode; // Properly typing the children prop
}

const DriverContext: React.FC<DriverContextProps> = ({ children }) => {
  const [driverContextData, setDriverContextData] = useState<{
    isLoading:boolean;
    driver: DriverTypesPopulated | null;
  }>({
      isLoading:true,
      driver:null
  });

  const updateDriver = (driverPayload:{
    isLoading:boolean;
    driver: DriverTypesPopulated | null;
  }) => {
    setDriverContextData(driverPayload);
  };

  const value: DriverContextTypes = {
    driverContextData,
    setDriverContextData,
    updateDriver
  };

  return (
    <DriverInitialContextData.Provider value={value}>
      {children}
    </DriverInitialContextData.Provider>
  );
};

export default DriverContext;
