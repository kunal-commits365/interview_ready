import { createBrowserRouter, Navigate } from 'react-router'
import Login from './features/auth/pages/Login.jsx'
import Register from './features/auth/pages/Register.jsx'
import ProtectedRoute from './features/auth/components/ProtectedRoute.jsx'
import GuestRoute from './features/auth/components/GuestRoute.jsx'
import Layout from './components/Layout.jsx'
import Home from './features/interview/pages/Home.jsx'
import NewInterview from './features/interview/pages/NewInterview.jsx'
import InterviewReport from './features/interview/pages/InterviewReport.jsx'


export const router = createBrowserRouter([
    {
        element: <GuestRoute />,
        children: [
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            },
        ]
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                element: <Layout />,
                children: [
                    {
                        path: "/home",
                        element: <Home />
                    },
                    {
                        path: "/interview/new",
                        element: <NewInterview />
                    },
                    {
                        path: "/interview/:interviewId",
                        element: <InterviewReport />
                    },
                ]
            }
        ]
    },
    {
        path: "*",
        element: <Navigate to="/home" replace />
    },
])

export default router
