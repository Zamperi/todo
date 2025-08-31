import { createContext } from "react";

export const UserContext = createContext({
  user: null, //Rakenne {id: email: token: expiresAt: || null}
  isAuthenticated: false,
  signIn: async (email, password) => {},
  signUp: async (email, password) => {},
  signOut: () => {},
});
