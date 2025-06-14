import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import songRouter from './src/routes/songRoute.js'
import connectDB from './src/config/mongodb.js'
import connectCloudinary from './src/config/cloudinary.js'


// APP CONFIG  
const app = express()
const port = process.env.PORT || 4000
connectDB();
connectCloudinary();


// MIDDLEWARES
app.use(cors())
app.use(express.json())


// ROUTES

app.use("/api/song", songRouter) 
    

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`App is running on port ${port}`)
})

