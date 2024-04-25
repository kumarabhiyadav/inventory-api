"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierRoutes = void 0;
const express_1 = __importDefault(require("express"));
const supplier_controller_1 = require("./supplier.controller");
exports.SupplierRoutes = express_1.default.Router();
exports.SupplierRoutes.post("/createSupplier", supplier_controller_1.createSupplier);
exports.SupplierRoutes.get("/fetchSupplier", supplier_controller_1.fetchSupplier);
