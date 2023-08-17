import { createContext, useContext, useState } from "react";

// User provider
const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedPreferences, setSelectedPreferences] = useState([]);

  const updateUser = (newUserId) => { setUserId(newUserId); };
  const updateIngredients = (newSelectedIngredients) => { setSelectedIngredients(newSelectedIngredients); };
  const updatePreferences = (newSelectedPreferences) => { setSelectedPreferences(newSelectedPreferences); };

  return (
    <GlobalContext.Provider value={{ userId, updateUser, selectedIngredients, updateIngredients, selectedPreferences, updatePreferences }}>
      {children}
    </GlobalContext.Provider>
  );
};
