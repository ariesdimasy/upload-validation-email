"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSampledata = void 0;
const express_validator_1 = require("express-validator");
exports.validateSampledata = [
    (0, express_validator_1.body)("name").notEmpty().withMessage("Name is Requires"),
    (0, express_validator_1.body)("code").notEmpty().withMessage("Code id Required"),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({
                message: "error",
                errors: errors.array()
            });
        }
        return next();
    }
];
