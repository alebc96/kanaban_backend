import { Request, Response } from "express";
import { getConnection } from "../database/database";

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