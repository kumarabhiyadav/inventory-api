"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerRoutes = void 0;
const express_1 = __importDefault(require("express"));
const customer_controllers_1 = require("./customer.controllers");
exports.CustomerRoutes = express_1.default.Router();
exports.CustomerRoutes.post("/createCustomer", customer_controllers_1.createCustomer);
exports.CustomerRoutes.post("/fetchCustomers", customer_controllers_1.fetchCustomers);
exports.CustomerRoutes.post("/searchCustomer", customer_controllers_1.searchCustomer);
