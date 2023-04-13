import { useSelector } from "react-redux";
import { Navigate } from "react-router";

function ProtectedRoute({ children }) {
    const { isAuthenticated } = useSelector(state => state.authState)
    if (!isAuthenticated) {
        return <Navigate to="/" />
    }
    if (isAuthenticated) {
        <Navigate to="/home" />
        return children
    }
}

export default ProtectedRoute;