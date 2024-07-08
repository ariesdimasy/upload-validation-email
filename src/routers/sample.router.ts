import { validateSampledata } from "../middleware/sampleValidation"
import { uploader } from "../middleware/uploader"
import SampleController from "./../controllers/sample.controller"
import { Router } from "express"

export default class SampleRouter {
    private router: Router
    private sampleController: SampleController

    constructor () {
        this.sampleController = new SampleController()
        this.router = Router()
        this.initializeRoutes()
    }

    private initializeRoutes(): void {
        this.router.get("/", this.sampleController.getSampleData)
        this.router.post("/", validateSampledata, this.sampleController.createSampleData)
        this.router.post("/single-upload", uploader("IMG", "/images").single("file"), this.sampleController.addnewImage)
        this.router.post("/multiple-upload", uploader("IMG", "/images").array("files", 3), this.sampleController.addMultiImages)
        this.router.post("/send-email", this.sampleController.sendEmail)
    }

    getRouter(): Router {
        return this.router
    }
}