"use client";

import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export default function UserContext({ children }) {
  const [user, setUser] = useState();

  return (
    <Message_data.Provider value={{ user, setUser }}>
      {children}
    </Message_data.Provider>
  );
}
