import { Router } from "express";
import { createTask, deleteTaskById, editTaskById, getAllTaskByColumnId, getTaskById } from "../controllers/task.controller";


const router = Router();
// TODO: -->> Probar rutas en Postman
router.post("/tasks", createTask);
router.get("/tasks", getAllTaskByColumnId);
router.get("/tasks/task", getTaskById);
router.put("/tasks", editTaskById);
router.delete("/tasks", deleteTaskById);

export default router;