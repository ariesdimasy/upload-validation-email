import express, { json, urlencoded, Express, Request, Response, NextFunction } from "express"
import cors from "cors"
import SampleRouter from "./routers/sample.router"

const PORT = 8000

export default class App {
    private app: Express

    constructor () {
        this.app = express()
        this.configure()
        this.routes()
        this.handleError()
    }

    private configure(): void {
        this.app.use(cors())
        this.app.use(json())
        this.app.use(urlencoded({ extended: true }))
        this.app.use(express.static('public'))
    }

    private handleError(): void {
        this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
            console.log("Error : ", err.stack)
            return res.status(500).send({
                message: "error",
                data: err.message
            })
        })
    }

    private routes(): void {
        const sampleRouter = new SampleRouter()

        this.app.use("/samples", sampleRouter.getRouter())
    }

    public start(): void {
        this.app.listen(PORT, () => {
            console.log(`-> [API] Local: http://localhost:${PORT}`)
        })
    }
}