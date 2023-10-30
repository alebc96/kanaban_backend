import { Request, Response } from "express";
import { getConnection } from '../database/database';

export const createColumn = async (req: Request, res: Response) => {
    const {column_name, board_id} = req.body
    const connection = await getConnection()
    try {
        const column = {column_name, board_id}
        const result = await connection.query("INSERT INTO columns SET ?", column)
        console.log(result)
        if(result.affectedRows > 0) res.status(200).send(result)
        else res.status(400).json("Please introduce valid data")
    } catch (error: any) {
        if(error.code === "ER_NO_REFERENCED_ROW_2") res.status(404).send({msg: "Board not found"})
        else res.status(500).send(error)
    }
}

export const getAllColumnsByBoradId = async (req: Request, res: Response) => {
    const { id } = req.query
    const connection = await getConnection()
    try {
        const result = await connection.query("SELECT * FROM columns WHERE board_id = ?", [id])
        if(result.length > 0) res.status(200).send(result)
        else res.status(404).send({msg: "Columns not found for this baord"})
    } catch (error: any) {
        if(error.code === "ER_NO_REFERENCED_ROW_2") res.status(404).send({msg: "Board not found"})
        res.status(500).send(error)
    }
}

export const getColumnById = async (req: Request, res: Response) => {
    const { id } = req.query
    const connection = await getConnection()
    try {
        const result = await connection.query("SELECT * FROM columns WHERE column_id = ?", [id])
        if(result.length > 0) res.status(200).send(result)
        else res.status(404).send({msg: "Columns not found"})
    } catch (error: any) {
        if(error.code === "ER_NO_REFERENCED_ROW_2") res.status(404).send({msg: "Board not found"})
        res.status(500).send(error)
    }
}

export const editColumnById = async (req: Request, res: Response) => {
    const { id } = req.query
    const { column_name } = req.body
    const connection = await getConnection()
    try {
        const result: any = await connection.query("UPDATE columns SET column_name = ? WHERE column_id = ?", [column_name,id])
        if(result.affectedRows > 0) res.status(200).send(result)
        else res.status(404).send({msg: "Column not found"})
    } catch (error) {
        res.status(500).send(error)
    }
}

export const deleteColumnById = async (req: Request, res: Response) => {
    const { id } = req.query
    const connection = await getConnection()
    try {
        const result: any = await connection.query("DELETE FROM columns WHERE column_id = ?", [id])
        if(result.affectedRows === 1) res.status(200).send(result)
        else res.status(404).send({msg: "Column not found"})
    } catch (error) {
        res.status(500).send(error)
    }
}