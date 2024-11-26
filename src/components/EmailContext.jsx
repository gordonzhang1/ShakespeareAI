import React, { createContext, useState, useContext } from "react";

// Create the context
const EmailContext = createContext();

// Create a provider component
export function EmailProvider({ children }) {
  const [email, setEmail] = useState("");

  return (
    <EmailContext.Provider value={{ email, setEmail }}>
      {children}
    </EmailContext.Provider>
  );
}

// Custom hook for using the EmailContext
export function useEmail() {
  return useContext(EmailContext);
}
