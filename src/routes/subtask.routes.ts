import { Router } from "express";
import {
  createSubtask,
  deleteSubtaskById,
  editSubtaskById,
  getAllSubtaskByColumnId,
  getSubtaskById,
} from "../controllers/subtask.controller";

const router = Router();
// TODO: -->> Probar rutas en Postman
router.post("/subtasks", createSubtask);
router.get("/subtasks", getAllSubtaskByColumnId);
router.get("/subtasks/subtask", getSubtaskById);
router.put("/subtasks", editSubtaskById);
router.delete("/subtasks/subtask", deleteSubtaskById);

export default router;
