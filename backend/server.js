import express from 'express';
import 'dotenv/config';
import { mongoose } from 'mongoose';
import { app_user_data_router } from './routes/app-user-data-route.js'



const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// app-data routing
app.use('/api/app-user-data',app_user_data_router)

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to db")
        // listen for request
        app.listen(process.env.PORT, () => {
            console.log("connected to port 5000 ")
        })
    })
    .catch((error) => {
        console.log(error)
    })