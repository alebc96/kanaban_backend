import { Router } from "express";
import {
  createColumn,
  deleteColumnById,
  editColumnById,
  getAllColumnsByBoradId,
  getColumnById,
} from "../controllers/column.controller";

const router = Router();

router.post("/columns", createColumn);
router.get("/boards/columns", getAllColumnsByBoradId);
router.get("/columns/column", getColumnById);
router.put("/columns/column", editColumnById);
router.delete("/columns", deleteColumnById);

export default router;
