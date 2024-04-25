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
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchCustomer = exports.fetchCustomers = exports.createCustomer = void 0;
const Customer_model_1 = require("./Customer.model");
const createCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { customerName, companyName, phone, email, address } = req.body;
    try {
        const customer = yield Customer_model_1.CustomerModel.create({
            companyName,
            customerName,
            phone,
            email,
            address
        });
        if (customer) {
            res.status(201).json({
                success: true,
                message: "Customer Created Successfull",
                result: customer,
            });
        }
        else {
            res.status(201).json({
                success: false,
                message: "Failed to create customer",
                result: null,
            });
        }
    }
    catch (error) {
        res.status(201).json({
            success: false,
            message: "Failed to create customer",
            error: error,
        });
    }
});
exports.createCustomer = createCustomer;
const fetchCustomers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customer = yield Customer_model_1.CustomerModel.find({
            isActive: true,
            isDeleted: false,
        });
        if (customer) {
            res.status(201).json({
                success: true,
                message: "Customer fetched Successfull",
                result: customer,
            });
        }
        else {
            res.status(201).json({
                success: false,
                message: "Failed to fetch customer",
                result: null,
            });
        }
    }
    catch (error) {
        res.status(201).json({
            success: false,
            message: "Failed to fetch customer",
            error: error,
        });
    }
});
exports.fetchCustomers = fetchCustomers;
const searchCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { query } = req.body;
    try {
        const customer = yield Customer_model_1.CustomerModel.find({
            $or: [
                { companyName: { $regex: query } },
                { customerName: { $regex: query } },
            ],
        });
        if (customer) {
            res.status(201).json({
                success: true,
                message: "searched",
                result: customer,
            });
        }
        else {
            res.status(201).json({
                success: false,
                message: "Failed to search",
                result: null,
            });
        }
    }
    catch (error) {
        res.status(201).json({
            success: false,
            message: "Failed to search",
            error: error,
        });
    }
});
exports.searchCustomer = searchCustomer;
