import { Request, Response } from "express";
import { getConnection } from '../database/database';

export const getAllUsers = async (_req: Request, res: Response) => {
    const connection = await getConnection()
    try {
        const result = await connection.query("SELECT * FROM users;")
        console.log(result)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).send(error)
    }
}

export const createUser = async (req: Request, res: Response) => {
    const {email, password} = req.body;
    const connection = await getConnection()
    try {
        const user = {email, password}
        const result = await connection.query(`INSERT INTO users SET ?`, user)
        if(result.affectedRows > 0) res.status(200).send(result)
        else res.status(400).send("Please introduce valid data")
    } catch (error: any) {
        if(error.code === "ER_DUP_ENTRY") return res.status(400).send({msg: "User already exist"})
        res.status(500).send(error)
    }
}

export const getUserById = async (req:Request, res: Response) => {
    const { id } = req.params
    const connection = await getConnection()
    try {
        const result = await connection.query(`SELECT * FROM users WHERE user_id  = ?`, [id])
        if(result.length === 0) return res.status(404).send({msg: "User not found"})
        else return res.status(200).send(result)
    } catch (error) {
        res.status(500).send(error)
    }
}

export const editUserById = async (req: Request, res:Response) => {
    const { id } = req.params
    const { email, password } = req.body
    const connection = await getConnection()
    try {
        const result = await connection.query('UPDATE users SET email = ?, password = ? WHERE user_id = ?',[email, password, id])
        if(result.affectedRows > 0) return res.status(200).send(result)
        else return res.status(404).send({msg: "User not found"})
    } catch (error: any) {
        res.status(500).send(error)
    }
}

export const login = async (req: Request, res: Response) => {
    const {email, password} = req.body
    console.log({email, password})
    try {
        const connection = await getConnection()
        const userLogged = await connection.query("select * from users where email = ? and password = ?", [email, password])
        console.log({userLogged})
        if(userLogged.length > 0) return res.status(200).send(userLogged)
        else return res.status(404).send({msg: "User not found"}) 
    } catch (error) {
        res.status(200).send(error)
    }
}

