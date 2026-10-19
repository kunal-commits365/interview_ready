import { Navigate, Outlet } from "react-router"
import { useAuth } from "../hooks/useauth"


const ProtectedRoute = () => {
    const { user, loading } = useAuth()

    if (loading) {
        return (
            <div className="page-loader">
                <span className="spinner" />
            </div>
        )
    }

    if (!user) {
        return <Navigate to="/login" replace />
    }

    return <Outlet />
}


export default ProtectedRoute
