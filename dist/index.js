"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const main = () => {
    const app = new app_1.default();
    app.start();
};
main();
