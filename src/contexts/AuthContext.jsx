import React, { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const AuthContext = createContext();

function makeIdFromName(name = "") {
  // Create a deterministic id from the display name (safe URL-friendly slug)
  const slug = name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
  return slug || `user_${Date.now()}`;
}

export const AuthProvider = ({ children }) => {
  // persist the user object across refreshes
  const [user, setUser] = useLocalStorage("ssph_user", null);

  // login accepts { name } and returns the created user
  const login = ({ name = "Student" } = {}) => {
    const id = makeIdFromName(name);
    const newUser = { id, name };
    setUser(newUser);
    return newUser;
  };

  const logout = () => {
    // keep bookings in localStorage (do NOT clear bookings); only clear session
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
