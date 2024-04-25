"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceRoutes = void 0;
const express_1 = __importDefault(require("express"));
const invoice_controllers_1 = require("./invoice.controllers");
exports.InvoiceRoutes = express_1.default.Router();
exports.InvoiceRoutes.post("/createInvoice", invoice_controllers_1.createInvoice);
exports.InvoiceRoutes.post("/fetchInvoices", invoice_controllers_1.fetchInvoices);
