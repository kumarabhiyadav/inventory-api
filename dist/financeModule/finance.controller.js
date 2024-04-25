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
exports.fetchSales = exports.createSales = void 0;
const tryCatchFn_1 = require("../utils/Helpers/tryCatchFn");
const finance_model_1 = require("./finance.model");
exports.createSales = (0, tryCatchFn_1.tryCatchFn)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { date, onlineAmount, cashAmount } = req.body;
    let sale = yield finance_model_1.FinanceModel.create({
        date,
        onlineAmount,
        cashAmount,
    });
    if (sale) {
        res.status(200).json({
            success: true,
            result: sale,
        });
    }
    else {
        res.status(200).json({
            success: false,
            result: sale,
        });
    }
}));
exports.fetchSales = (0, tryCatchFn_1.tryCatchFn)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let sales = yield finance_model_1.FinanceModel.find({
        isActive: true,
        isDeleted: false,
    }).sort({
        date: -1
    });
    if (sales) {
        res.status(200).json({
            success: true,
            result: sales,
        });
    }
    else {
        res.status(200).json({
            success: false,
            result: sales,
        });
    }
}));
