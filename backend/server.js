import express from 'express'
import cors from 'cors'
import 'dotenv/config'


// APP CONFIG  
const app = express()
const port = process.env.PORT || 4000


// MIDDLEWARES
app.use(cors())
app.use(express.json())


// ROUTES
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`App is running on port ${port}`)
})

