import express, { Request, Response } from "express"
import cors from "cors"
import dotenv from "dotenv"
import morgan from "morgan"
// ->> import routes
import userRoutes from "./routes/user.routes"
import boardRoutes from "./routes/board.routes"
import columnRoutes from "./routes/column.routes"

dotenv.config()
const app = express()

app.set('port', process.env.PORT || 4000)

// --> Middlewares
app.use( cors() )
app.use( morgan("dev") )
app.use( express.json() )
app.use( express.urlencoded({extended: false}) )

// --> Routes
app.use(userRoutes)
app.use(boardRoutes)
app.use(columnRoutes)
app.get( '/', (_req: Request, res: Response) => {
    res.status(200).send("API RUNNING OK")
})

export default app
