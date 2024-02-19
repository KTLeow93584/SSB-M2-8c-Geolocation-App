import { useState, createContext, useContext } from 'react';

const ErrorContext = createContext(null);
export function GetErrorContext() {
    return useContext(ErrorContext);
}

export function ErrorContextProvider({ children }) {
    const [errorMessage, setErrorMessage] = useState("");

    return (
        <ErrorContext.Provider value={{ errorMessage: errorMessage, setErrorMessage: setErrorMessage }}>
            {children}
        </ErrorContext.Provider>
    );
}