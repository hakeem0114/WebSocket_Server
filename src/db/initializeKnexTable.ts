import { knexInstance } from "./knexInstance";
import { User } from "../models/interfaces";

export const initializeDB = async(): Promise<void> =>{
    await knexInstance.schema.hasTable('users').then(function (exists:boolean) {
        if (!exists) {
                knexInstance.schema.createTableIfNotExists('users', function (table) { //.createTable
                table.increments('id').primary(); //Auto-increments works for SQLite only if its a primary 
                table.string('name').notNullable(); 
                table.string('email').notNullable().unique();
            });
        }
    });
}

