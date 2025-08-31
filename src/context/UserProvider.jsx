import { useEffect, useMemo, useState } from "react";
import UserContext from "./UserContext";
import axios from "axios";

const STORAGE_KEY = "user";
const API = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null; // { id?, email?, token? } | null
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      sessionStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const signIn = async (email, password) => {
    const headers = { headers: { "Content-Type": "application/json" } };
    const res = await axios.post(`${API}/user/signin`, { user: { email, password } }, headers);
    setUser(res.data);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(res.data));
  };

  const signUp = async (email, password) => {
    const headers = { headers: { "Content-Type": "application/json" } };
    await axios.post(`${API}/user/signup`, { user: { email, password } }, headers);
  };

  const signOut = () => {
    setUser(null);
    sessionStorage.removeItem(STORAGE_KEY);
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user?.token),
      signIn,
      signUp,
      signOut,
    }),
    [user]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserProvider;
