import express, {Router, Request, Response} from 'express'
import {
    getUsers,
    createUser,
    updateUser 
} from '../controllers/userControllers'

//Start Router
const router = Router()

//Create Routes
router.get('/allUsers', getUsers)
router.post('/create',createUser)
router.patch('/update/:id',updateUser)



export default router;