import { Router } from "express";
import {
  createBoard,
  deleteBoardById,
  editBoardById,
  getAllBoardsByUserId,
  getBoardById,
} from "../controllers/boards.controller";

const router = Router();

router.post("/boards", createBoard);
router.delete("/boards", deleteBoardById);
router.get("/boards", getAllBoardsByUserId);
router.get("/boards/board", getBoardById);
router.put("/boards/board", editBoardById);

export default router;
