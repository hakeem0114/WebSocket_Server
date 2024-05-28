//Express Imports
import { Request, Response } from "express"

//Interface Imports
import { User } from "../models/interfaces"

//Model Imports 
import {
    fetchAllUsers,
    addUser, 
    updateUserById
} from '../models/userModels'

//Yup Imports
import { validateUserObject } from '../utils/validateSchema'

//WebSocket Imports 
import { broadCast } from "../utils/reactWebSocket"


export const getUsers = async(req: Request, res: Response): Promise<void> =>{
    try{
        const users = await fetchAllUsers()
        res.status(200).json(users)   
        
        if(users.length == 0){
            res.status(404).json({message: 'Empty Table'})
        }
    }
    catch(err:any){
        res.status(500).json({message: err.message})
    }
}

export const createUser = async(req: Request, res: Response): Promise<void> =>{
    try{

        //dB 
        const validatedNewUserBody = await validateUserObject.validate(req.body) as User
        const createdUser = await addUser(validatedNewUserBody)

        //Websocket
        const id = createdUser.id
        broadCast({
            event:'createdUser',
            data:{
                id,
                ...createdUser
            }
        }) //Send back new user object

        //Response
        res.status(201).json({message:`Created User: ${createdUser}`})                     
    }
    catch(err:any){
        res.status(400).json({message: err.message})
    }    
}

export const updateUser = async(req: Request, res: Response): Promise<void> =>{
    try{
        const validatedBodyToUpdate = await validateUserObject.validate(req.body) as User
        const {id} = req.params
        const updatedUser = await updateUserById(Number(id),validatedBodyToUpdate)

        //Websocket
        broadCast({
            event:'updatedUser',
            data:{
                id,
                ...updatedUser
            }
        }) //Send back new user object
        
        res.status(200).json({message:`Updated User: ${updatedUser}`})                     
    }
    catch(err:any){
        res.status(400).json({message: err.message})
    }
}