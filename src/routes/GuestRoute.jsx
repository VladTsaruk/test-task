import { Navigate } from "react-router-dom";

export function GuestRoute({ children }) {
    const isAuth = !!localStorage.getItem("token");
    return !isAuth ? children : <Navigate to="/" replace />;
}