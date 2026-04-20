require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const connectDB = require('./config/db')

connectDB()

app.use(cors())
app.use(express.json())

const userRoutes = require('./routes/userRoutes')
app.use('/api/users', userRoutes)

const taskRoutes = require('./routes/taskRoutes')
app.use('/api/tasks', taskRoutes)


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is running on localhost:${PORT}`)
})