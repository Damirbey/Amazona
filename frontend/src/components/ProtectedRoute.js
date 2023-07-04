import { useContext } from "react";
import { Store } from "../Store";
import { Navigate } from "react-router-dom";

function ProtectedRoute ({children}){
    const {state, dispatch:ctxDispatch} = useContext(Store);
    const {userInfo} = state;

    return userInfo ? children : <Navigate to="/signIn"/>
}
export default ProtectedRoute;