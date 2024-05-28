
//Knex Imports
import { knexInstance } from '../db/knexInstance'

//Interface Imports
import { User } from './interfaces'



export const fetchAllUsers = async(): Promise<User[]> =>{ 
    const allUsers = await knexInstance.select().from('users') // return await knex('users').select('*'); //less readable
    return allUsers
}

export const addUser = async(newUser: User): Promise<User> =>{ 
    //insert user to db & return it = 1 user user object using User interface
    const [savedUser] = await knexInstance('users').insert(newUser).returning('*'); //Destructures recent user
    return savedUser;
}

export const updateUserById = async (id: number, user: User): Promise<User> => {
    const [updatedUser] = await knexInstance('users')
      .where({ id })
      .update(user)
      .returning('*');
    return updatedUser;
  };

    