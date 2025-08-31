import { useUser } from "../context/useUser";
import {Outlet,Navigate} from "react-router-dom";

function ProtectedRoute(){
    const { user } = useUser();
    if(!user || !user.token) return <Navigate to="/signin" replace/>
    return (<Outlet/>);
}

export default ProtectedRoute;