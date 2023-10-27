import { Request, Response } from "express";
import { getConnection } from "../database/database";

export const createBoard = async (req: Request, res: Response) => {
    const {board_name, user_id} = req.body
    const connection = await getConnection()
    try {
        const board = {board_name, user_id}
        const result = await connection.query("INSERT INTO boards SET ?", board)
        console.log(result)
        if(result.affectedRows > 0) res.status(200).send(result)
        else res.status(400).json("Please introduce valid data")
    } catch (error: any) {
        res.status(500).send(error)
    }
}

export const getAllBoardsByUserId = async (req: Request, res: Response) => {
    const { id } = req.query
    const connection = await getConnection()
    try {
        const result = await connection.query("SELECT * FROM boards WHERE user_id = ?", [id])
        if(result.length > 0) res.status(200).send(result)
        else res.status(404).send({msg: "Boards not found for this user"})
    } catch (error) {
        res.status(500).send(error)
    }
}

export const getBoardById = async (req: Request, res: Response) => {
    const { id } = req.query
    const connection = await getConnection()
    try {
        const result = await connection.query("SELECT * FROM boards WHERE board_id = ?", [id])
        if(result.length > 0) res.status(200).send(result)
        else res.status(404).send({msg: "Board not found"})
    } catch (error) {
        res.status(500).send(error)
    }
}

export const editBoardById = async (req: Request, res: Response) => {
    const { id } = req.query
    const { board_name } = req.body
    const connection = await getConnection()
    try {
        const result: any = await connection.query("UPDATE boards SET board_name = ? WHERE board_id = ?", [board_name,id])
        if(result.affectedRows > 0) res.status(200).send(result)
        else res.status(404).send({msg: "Board not found"})
    } catch (error) {
        res.status(500).send(error)
    }
}

export const deleteBoardById = async (req: Request, res: Response) => {
    const { id } = req.query
    const connection = await getConnection()
    try {
        const result: any = await connection.query("DELETE FROM boards WHERE board_id = ?", [id])
        if(result.affectedRows === 1) res.status(200).send(result)
        else res.status(404).send({msg: "Board not found"})
    } catch (error) {
        res.status(500).send(error)
    }
}