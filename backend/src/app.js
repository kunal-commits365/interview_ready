
const express = require('express')
const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
const cookieparser = require('cookie-parser')
const cors = require('cors');




const app = express()
app.use(express.json())
app.use(cookieparser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

const authRouter = require('./routes/auth.route')
const interviewRouter = require('./routes/interview.route')


app.use('/api/auth', authRouter)
app.use('/api/interview', interviewRouter)

app.get('/health', (req,res) =>{
    res.json({
        message: 'serv is running '
    })
})


app.use((req, res) => {
    res.status(404).json({
        message: 'route not found'
    })
})


app.use((err, req, res, next) => {
    console.error(err)

    const status = err.status || err.statusCode || 500

    res.status(status).json({
        message: err.message || 'internal server error'
    })
})



module.exports = app;
