import express, {Request, Response} from 'express'
import cors from 'cors';
import dotenv from 'dotenv'
dotenv.config()

//Start App
const app = express()
const PORT = process.env.NODE_PORT || 3000

//Middleware 
app.use(cors())
app.use(express.json())


//Endpoints
app.get('/',(req:Request, res:Response)=>{
    res.status(200).json({Message:'Start of Websocket App'})
})


//Start Server
app.listen(PORT, ()=>{
    console.log(`Node Server running on Port ${PORT}`)
})
