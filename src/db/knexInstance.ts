import Knex from "knex";

const config = {
    client: 'sqlite3', // or 'better-sqlite3'
    connection: {
        filename: './src/db/sqLiteDB',
    },
    useNullAsDefault: true,
}

export const knexInstance = Knex(config) //Knex instance

