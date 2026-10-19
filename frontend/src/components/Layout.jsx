import { Link, NavLink, Outlet, useNavigate } from "react-router"
import { useAuth } from "../features/auth/hooks/useauth"


const Layout = () => {
    const { user, handleLogout } = useAuth()
    const navigate = useNavigate()

    const onLogout = async () => {
        const success = await handleLogout()

        if (success) {
            navigate('/login')
        }
    }

    return (
        <div className="app-shell">
            <header className="navbar">
                <Link to="/home" className="brand">
                    Interview<span className="highlight">AI</span>
                </Link>

                <nav className="nav-links">
                    <NavLink to="/home">Dashboard</NavLink>
                    <NavLink to="/interview/new">New Interview</NavLink>
                </nav>

                <div className="nav-user">
                    <span className="nav-username">{user?.username}</span>
                    <button className="button ghost-button" onClick={onLogout}>Logout</button>
                </div>
            </header>

            <main className="page-content">
                <Outlet />
            </main>
        </div>
    )
}


export default Layout
