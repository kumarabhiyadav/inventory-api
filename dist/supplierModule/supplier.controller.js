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
exports.fetchSupplier = exports.createSupplier = void 0;
const tryCatchFn_1 = require("../utils/Helpers/tryCatchFn");
const supplier_model_1 = require("./supplier.model");
exports.createSupplier = (0, tryCatchFn_1.tryCatchFn)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { name, address } = req.body;
    let supplier = yield supplier_model_1.SupplierModel.create({
        name,
        address
    });
    if (supplier) {
        res.status(200).json({
            success: true,
            result: supplier,
        });
    }
    else {
        res.status(200).json({
            success: false,
            result: supplier,
        });
    }
}));
exports.fetchSupplier = (0, tryCatchFn_1.tryCatchFn)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let suppliers = yield supplier_model_1.SupplierModel.find({
        isActive: true,
        isDeleted: false,
    }).sort({
        createdAt: -1
    });
    if (suppliers) {
        res.status(200).json({
            success: true,
            result: suppliers,
        });
    }
    else {
        res.status(200).json({
            success: false,
            result: suppliers,
        });
    }
}));
