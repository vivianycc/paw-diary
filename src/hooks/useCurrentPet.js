import { useState, useContext, createContext } from "react";

const currentPetContext = createContext();

export default function useCurrentPet() {
  const currentPet = useContext(currentPetContext);
  return currentPet;
}

export const CurrentPetProvider = ({ children }) => {
  const [currentPet, setCurrentPet] = useState("");
  return (
    <currentPetContext.Provider value={{ currentPet, setCurrentPet }}>
      {children}
    </currentPetContext.Provider>
  );
};
