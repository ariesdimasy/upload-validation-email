"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sampleValidation_1 = require("../middleware/sampleValidation");
const uploader_1 = require("../middleware/uploader");
const sample_controller_1 = __importDefault(require("./../controllers/sample.controller"));
const express_1 = require("express");
class SampleRouter {
    constructor() {
        this.sampleController = new sample_controller_1.default();
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get("/", this.sampleController.getSampleData);
        this.router.post("/", sampleValidation_1.validateSampledata, this.sampleController.createSampleData);
        this.router.post("/single-upload", (0, uploader_1.uploader)("IMG", "/images").single("file"), this.sampleController.addnewImage);
        this.router.post("/multiple-upload", (0, uploader_1.uploader)("IMG", "/images").array("files", 3), this.sampleController.addMultiImages);
        this.router.post("/send-email", this.sampleController.sendEmail);
    }
    getRouter() {
        return this.router;
    }
}
exports.default = SampleRouter;
