import { Navigate, Outlet } from "react-router"
import { useAuth } from "../hooks/useauth"


const GuestRoute = () => {
    const { user, loading } = useAuth()

    if (loading) {
        return (
            <div className="page-loader">
                <span className="spinner" />
            </div>
        )
    }

    if (user) {
        return <Navigate to="/home" replace />
    }

    return <Outlet />
}


export default GuestRoute
