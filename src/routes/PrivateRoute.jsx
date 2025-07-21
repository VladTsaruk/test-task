import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export function PrivateRoute({ children }) {
    const isAuth = !!localStorage.getItem("token");

    return isAuth ? children : <Navigate to="/login" replace />;
}