import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUser } from "../context/useUser";

import './Authentication.css';

export const AuthenticationMode = Object.freeze({
  SignIn: "SignIn",
  SignUp: "SignUp",
});

export default function Authentication({ authenticationMode }) {
  const { signUp, signIn } = useUser();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const signFunction =
      authenticationMode === AuthenticationMode.SignUp ? signUp : signIn;

    try {
      await signFunction(email, password);
      navigate(
        authenticationMode === AuthenticationMode.SignUp ? "/signin" : "/"
      );
    } catch (error) {
      alert(error?.response?.data?.error ?? error.message);
    }
  };

  return (
    <div className="auth-container">
      <h3>{authenticationMode === AuthenticationMode.SignIn ? "Sign in" : "Sign up"}</h3>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          placeholder="Email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password:</label>
        <input
          placeholder="Password"
          type="password"
          autoComplete={
            authenticationMode === AuthenticationMode.SignUp
              ? "new-password"
              : "current-password"
          }
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">
          {authenticationMode === AuthenticationMode.SignIn ? "Sign in" : "Submit"}
        </button>
        <Link to={authenticationMode === AuthenticationMode.SignIn ? "/signup" : "/signin"}>
          {authenticationMode === AuthenticationMode.SignIn
            ? "No account? Sign up"
            : "Already signed up? Sign in"}
        </Link>
      </form>
    </div>
  );
}
