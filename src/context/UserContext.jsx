import { createContext } from "react";

const UserContext = createContext({
  user: null,                 // { id?, email?, token? } | null
  isAuthenticated: false,
  signIn: async (_email, _password) => {},
  signUp: async (_email, _password) => {},
  signOut: () => {},
});

export default UserContext;
