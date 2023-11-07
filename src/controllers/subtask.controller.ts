import { Request, Response } from "express";
import { getConnection } from "../database/database";

// -->> TODO: PROBAR EN POSTMAN <<--

export const createSubtask = async (req: Request, res: Response) => {
  const { subtask_description, task_id } = req.body;
  const connection = await getConnection();
  try {
    const subtask = { subtask_description, task_id };
    const result = await connection.query("INSERT INTO subtasks SET ?", subtask);
    console.log(result);
    if (result.affectedRows > 0) res.status(200).send(result);
    else res.status(400).json("Please introduce valid data");
  } catch (error: any) {
    if (error.code === "ER_NO_REFERENCED_ROW_2")
      res.status(404).send({ msg: "Task not found" });
    else res.status(500).send(error);
  }
};

export const getAllSubtaskByColumnId = async (req: Request, res: Response) => {
  const { id } = req.query;
  const connection = await getConnection();
  try {
    const result = await connection.query(
      "SELECT * FROM subtasks WHERE task_id = ?",
      [id]
    );
    if (result.length > 0) res.status(200).send(result);
    else res.status(404).send({ msg: "tasks not found for this column" });
  } catch (error: any) {
    if (error.code === "ER_NO_REFERENCED_ROW_2")
      res.status(404).send({ msg: "Columns not found" });
    res.status(500).send(error);
  }
};

export const getSubtaskById = async (req: Request, res: Response) => {
  const { id } = req.query;
  const connection = await getConnection();
  try {
    const result = await connection.query(
      "SELECT * FROM subtasks WHERE task_id = ?",
      [id]
    );
    if (result.length > 0) res.status(200).send(result);
    else res.status(404).send({ msg: "Task not found" });
  } catch (error: any) {
    if (error.code === "ER_NO_REFERENCED_ROW_2")
      res.status(404).send({ msg: "Subtasks not found" });
    res.status(500).send(error);
  }
};

export const editSubtaskById = async (req: Request, res: Response) => {
  const { id } = req.query;
  const { subtask_description } = req.body;
  const connection = await getConnection();
  try {
    const result: any = await connection.query(
      "UPDATE subtasks SET subtask_description = ? WHERE subtask_id = ?",
      [subtask_description, id]
    );
    if (result.affectedRows > 0) res.status(200).send(result);
    else res.status(404).send({ msg: "Subtasks not found" });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const deleteSubtaskById = async (req: Request, res: Response) => {
  const { id } = req.query;
  const connection = await getConnection();
  try {
    const result: any = await connection.query(
      "DELETE FROM subtasks WHERE subtasks_id = ?",
      [id]
    );
    if (result.affectedRows === 1) res.status(200).send(result);
    else res.status(404).send({ msg: "Subtasks not found" });
  } catch (error) {
    res.status(500).send(error);
  }
};
