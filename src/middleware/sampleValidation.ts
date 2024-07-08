import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator"

export const validateSampledata = [
    body("name").notEmpty().withMessage("Name is Requires"),
    body("code").notEmpty().withMessage("Code id Required"),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({
                message: "error",
                errors: errors.array()
            })
        }
        return next()
    }
]