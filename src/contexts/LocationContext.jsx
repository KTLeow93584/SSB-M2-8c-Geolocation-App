import { useState, createContext, useContext } from 'react';

const LocationContext = createContext(null);
export function GetLocationContext() {
    return useContext(LocationContext);
}

export function LocationContextProvider({ children }) {
    const [location, setLocation] = useState(null);

    return (
        <LocationContext.Provider value={{ location: location, setLocation: setLocation }}>
            {children}
        </LocationContext.Provider>
    );
}