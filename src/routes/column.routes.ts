import { Router } from "express"
import { createColumn } from '../controllers/column.controller';

const router = Router()

router.post("/columns", createColumn)

export default router