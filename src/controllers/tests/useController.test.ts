import request from 'supertest';
import express from 'express';
import cors from 'cors';
import userRoutes from '../../routes/userRoutes';

//Start App
const app = express();

//Middleware
app.use(cors());
app.use(express.json());

//Endpoints
app.use('/',userRoutes)


describe('/user API',()=>{
    it('it should return a welcome message', async()=>{
        const res = await request(app).get('/user')
        expect(res.status).toBe(200)
        expect(res.body).toBe({Message:'Start of Websocket App'})
    })
})


