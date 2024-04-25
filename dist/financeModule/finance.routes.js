"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinanceRoutes = void 0;
const express_1 = __importDefault(require("express"));
const finance_controller_1 = require("./finance.controller");
exports.FinanceRoutes = express_1.default.Router();
exports.FinanceRoutes.post("/createSales", finance_controller_1.createSales);
exports.FinanceRoutes.get("/fetchSales", finance_controller_1.fetchSales);
