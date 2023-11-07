import { Request, Response } from "express";
import { getConnection } from '../database/database';

// -->> TODO: PROBAR EN POSTMAN <<--

export const createTask = async (req: Request, res: Response) => {
    const {task_name, task_description, column_id} = req.body
    const connection = await getConnection()
    try {
        const task = {task_name, task_description, column_id}
        const result = await connection.query("INSERT INTO tasks SET ?", task)
        console.log(result)
        if(result.affectedRows > 0) res.status(200).send(result)
        else res.status(400).json("Please introduce valid data")
    } catch (error: any) {
        if(error.code === "ER_NO_REFERENCED_ROW_2") res.status(404).send({msg: "Board not found"})
        else res.status(500).send(error)
    }
}

export const getAllTaskByColumnId = async (req: Request, res: Response) => {
    const { id } = req.query
    const connection = await getConnection()
    try {
        const result = await connection.query("SELECT * FROM tasks WHERE column_id = ?", [id])
        if(result.length > 0) res.status(200).send(result)
        else res.status(404).send({msg: "tasks not found for this column"})
    } catch (error: any) {
        if(error.code === "ER_NO_REFERENCED_ROW_2") res.status(404).send({msg: "Columns not found"})
        res.status(500).send(error)
    }
}

export const getTaskById = async (req: Request, res: Response) => {
    const { id } = req.query
    const connection = await getConnection()
    try {
        const result = await connection.query("SELECT * FROM tasks WHERE task_id = ?", [id])
        if(result.length > 0) res.status(200).send(result)
        else res.status(404).send({msg: "Task not found"})
    } catch (error: any) {
        if(error.code === "ER_NO_REFERENCED_ROW_2") res.status(404).send({msg: "Task not found"})
        res.status(500).send(error)
    }
}

export const editTaskById = async (req: Request, res: Response) => {
    const { id } = req.query
    const { task_name, task_description } = req.body
    const connection = await getConnection()
    try {
        const result: any = await connection.query("UPDATE tasks SET task_name = ? task_description = ? WHERE task_id = ?", [task_name, task_description, id])
        if(result.affectedRows > 0) res.status(200).send(result)
        else res.status(404).send({msg: "Task not found"})
    } catch (error) {
        res.status(500).send(error)
    }
}

export const deleteTaskById = async (req: Request, res: Response) => {
    const { id } = req.query
    const connection = await getConnection()
    try {
        const result: any = await connection.query("DELETE FROM tasks WHERE task_id = ?", [id])
        if(result.affectedRows === 1) res.status(200).send(result)
        else res.status(404).send({msg: "Task not found"})
    } catch (error) {
        res.status(500).send(error)
    }
}