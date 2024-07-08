"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("./../prisma"));
const nodemailer_1 = require("../helpers/nodemailer");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const handlebars_1 = __importDefault(require("handlebars"));
class SampleController {
    getSampleData(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isError = false;
                const samples = yield prisma_1.default.sample.findMany();
                if (isError)
                    throw new Error("Error from getsampledata");
                return res.status(200).send({
                    message: "success",
                    data: samples
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    createSampleData(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, code } = req.body;
                const newSampleData = yield prisma_1.default.sample.create({
                    data: {
                        code: code,
                        name: name
                    }
                });
                return res.status(201).send({
                    message: "Create Sample Data success",
                    data: newSampleData
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    addnewImage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { file } = req;
                if (!file)
                    throw new Error("No File Uploaded");
                return res.status(200).send({
                    message: `File ${file.filename} successfully uploaded`
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    addMultiImages(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { files } = req;
                if (!(files === null || files === void 0 ? void 0 : files.length))
                    throw new Error("No File Uploaded");
                return res.status(200).send({
                    message: `File successfully uploaded`
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    sendEmail(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email } = req.body;
            try {
                const templatePath = path_1.default.join(__dirname, "../templates", "email.hbs");
                const templateSource = fs_1.default.readFileSync(templatePath, {
                    encoding: 'utf-8'
                });
                const compiledTemplate = handlebars_1.default.compile(templateSource);
                const html = compiledTemplate({ name: name });
                yield nodemailer_1.transporter.sendMail({
                    from: "dimas@purwadhika.com",
                    to: email,
                    subject: "Welcome to Purwadhika",
                    html: html
                });
                res.status(200).send("send email success");
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.default = SampleController;
