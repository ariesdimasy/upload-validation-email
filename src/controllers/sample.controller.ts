import { NextFunction, Request, Response } from "express"
import prisma from "./../prisma"
import { transporter } from "../helpers/nodemailer"
import path from "path"
import fs from "fs"
import handlebard from "handlebars"

export default class SampleController {
    async getSampleData(req: Request, res: Response, next: NextFunction) {
        try {
            const isError = false

            const samples = await prisma.sample.findMany()

            if (isError) throw new Error("Error from getsampledata")

            return res.status(200).send({
                message: "success",
                data: samples
            })
        } catch (err) {
            next(err)
        }

    }

    async createSampleData(req: Request, res: Response, next: NextFunction) {
        try {

            const { name, code } = req.body

            const newSampleData = await prisma.sample.create({
                data: {
                    code: code,
                    name: name
                }
            })

            return res.status(201).send({
                message: "Create Sample Data success",
                data: newSampleData
            })
        } catch (err) {
            next(err)
        }

    }

    async addnewImage(req: Request, res: Response, next: NextFunction) {
        try {
            const { file } = req

            if (!file) throw new Error("No File Uploaded")

            return res.status(200).send({
                message: `File ${file.filename} successfully uploaded`
            })
        } catch (err) {
            next(err)
        }
    }

    async addMultiImages(req: Request, res: Response, next: NextFunction) {
        try {
            const { files } = req

            if (!files?.length) throw new Error("No File Uploaded")

            return res.status(200).send({
                message: `File successfully uploaded`
            })
        } catch (err) {
            next(err)
        }
    }

    async sendEmail(req: Request, res: Response, next: NextFunction) {

        const { name, email } = req.body

        try {

            const templatePath = path.join(__dirname, "../templates", "email.hbs")
            const templateSource = fs.readFileSync(templatePath, {
                encoding: 'utf-8'
            })
            const compiledTemplate = handlebard.compile(templateSource)
            const html = compiledTemplate({ name: name })

            await transporter.sendMail({
                from: "dimas@purwadhika.com",
                to: email,
                subject: "Welcome to Purwadhika",
                html: html
            })

            res.status(200).send("send email success")
        } catch (err) {
            next(err)
        }
    }
}