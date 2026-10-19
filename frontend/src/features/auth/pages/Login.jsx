import { useState } from 'react'
import { Link } from 'react-router'
import { useAuth } from '../hooks/useauth'
import { useNavigate } from 'react-router'


const Login = () => {
    const { loading, error, handleLogin } = useAuth()
   const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        const success = await handleLogin({ email, password })

        if (success) {
            navigate('/home')
        }
    }

    return (
        <main className="auth-page">
            <div className="form-container">
                <h1>Login</h1>

                <form onSubmit={handleSubmit}>

                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            onChange={(e) => { setEmail(e.target.value) }}
                            value={email}
                            type="email" id="email" name='email' placeholder='Enter email address' />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            onChange={(e) => { setPassword(e.target.value) }}
                            value={password}
                            type="password" id="password" name='password' placeholder='Enter password' />
                    </div>

                    {error && <p className="error-message">{error}</p>}

                    <button className='button primary-button' type='submit' disabled={loading}>Login</button>

                </form>

                <p>Don't have an account? <Link to={"/register"}>Register</Link> </p>
            </div>
        </main>
    )
}

export default Login
