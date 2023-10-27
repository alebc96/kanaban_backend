import mysql from "promise-mysql"

// -->> Crear una conexion SQL con la configuaracion del environment
export const connection = mysql.createConnection({
    host: 'localhost',
    database: 'kanban_db',
    user: 'root',
    password: 'S3rv3r',
    port: 33066
})

export function getConnection(){
    return connection
}
