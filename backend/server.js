require('dotenv').config()
const app = require('./src/app')
const connecttodb = require('./src/config/db')

const PORT = process.env.PORT || 3000

async function start() {
    try {
        await connecttodb()

        app.listen(PORT, () => {
            console.log(`running on port ${PORT}`)
        })
    } catch (error) {
        console.error('Failed to start server:', error.message)
        process.exit(1)
    }
}



start()
