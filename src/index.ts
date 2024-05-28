import express, {Request, Response} from 'express'
import cors from 'cors';
import dotenv from 'dotenv'
import { initializeDB } from './db/initializeKnexTable';
dotenv.config()

//Start App
const app = express()
const PORT = process.env.NODE_PORT || 3000

//Middleware 
app.use(cors())
app.use(express.json())
initializeDB()
    .then(()=>console.log("Connected to sqLite DB"))
    .catch(err=>console.log("Error initializing dB",err))


//Endpoints
app.get('/user',(req:Request, res:Response)=>{
    res.status(200).json({Message:'Start of Websocket App'})
})


//Start Server
app.listen(PORT, ()=>{
    console.log(`Node Server running on Port ${PORT}`)
})
