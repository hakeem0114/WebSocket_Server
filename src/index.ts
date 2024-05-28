import express, {Request, Response} from 'express'
import cors from 'cors';
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes'
import { initializeDB } from './db/initializeKnexTable';
import { reactWebSocketInstance } from './utils/reactWebSocket';
dotenv.config()

//Start App
const app = express()
const PORT = process.env.NODE_PORT || 3000

//Middleware 
app.use(cors())
app.use(express.json())

//Initalizations
initializeDB()
    .then(()=>console.log("Connected to sqLite DB"))
    .catch(err=>console.log("Error initializing dB",err))

reactWebSocketInstance()
    .then(()=>console.log("Server websocket door is open on PORT "+process.env.NODE_WEBHOOK_PORT))
    .catch(err=>console.log("Closed server websocket door",err))

//Endpoints
app.get('/user',(req:Request, res:Response)=>{
    res.status(200).json({Message:'Start of Websocket App'})
})
app.use('/user',userRoutes)

//Start Server
app.listen(PORT, ()=>{
    console.log(`Node Server running on Port ${PORT}`)
})
