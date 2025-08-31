import { useState } from "react";
import UserContext from "./UserContext";
import axios from "axios";

function UserProvider({children}){
    const [user, setUser] = useState(()=> {
        try {
            const userFromStorage = sessionStorage.getItem("user");
            return userFromStorage ? JSON.parse(userFromStorage) : null;
        } catch {
            return null;
        }
    });

    const signUp = async ()=>{
        const headers = {headers: {"Content-Type": "application/json"}};
        await axios.post(`${import.meta.env.VITE_API_URL}/user/signup`, {user: user}, headers);
        setUser({email: "", password: ""});
    }
    const signIn = async()=>{
        const headers = {headers: {"Content-Type": "application/json"}};
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/signin`, {user:user}, headers);
        setUser(response.data);
        sessionStorage.setItem(`user`, JSON.stringify(response.data));
    }
    return(
        <UserContext.Provider value={{user,setUser,signUp,signIn}}>
        {children}
        </UserContext.Provider>
    );
}

export default UserProvider;