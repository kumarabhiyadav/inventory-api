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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchInvoices = exports.createInvoice = void 0;
const Invoice_model_1 = require("./Invoice.model");
const ride_model_1 = require("../rideModule/ride.model");
const createInvoice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, e_1, _b, _c;
    let { invoiceNo, customer, date, source, total, destination, advance, rides, } = req.body;
    try {
        let rideIds = [];
        try {
            for (var _d = true, _e = __asyncValues(JSON.parse(rides)), _f; _f = yield _e.next(), _a = _f.done, !_a;) {
                _c = _f.value;
                _d = false;
                try {
                    const ride = _c;
                    let insertedRide = yield ride_model_1.RideModel.create({
                        truckNumber: ride.truckNumber,
                        lrNo: ride.lrNo,
                        date: ride.date,
                        particular: ride.particular,
                        quantity: ride.quantity,
                        rate: ride.rate,
                        detention: ride.detention,
                        customer: customer,
                        source: ride.source,
                        destination: ride.destination,
                    });
                    if (insertedRide) {
                        rideIds.push(insertedRide.id);
                    }
                }
                finally {
                    _d = true;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = _e.return)) yield _b.call(_e);
            }
            finally { if (e_1) throw e_1.error; }
        }
        const invoice = yield Invoice_model_1.InvoiceModel.create({
            invoiceNo,
            customer,
            date,
            source,
            destination,
            advance,
            rides: rideIds,
            total,
        });
        if (invoice) {
            res.status(201).json({
                success: true,
                message: "Invoice created Successfull",
                result: invoice,
            });
        }
        else {
            res.status(201).json({
                success: false,
                message: "Failed to create invoice",
                result: null,
            });
        }
    }
    catch (error) {
        res.status(201).json({
            success: false,
            message: "Failed to create invoice ",
            error: error,
        });
    }
});
exports.createInvoice = createInvoice;
const fetchInvoices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { invoiceNo, customer, date, source, destination, advance, rides } = req.body;
    try {
        const invoice = yield Invoice_model_1.InvoiceModel.find({
            isDeleted: false,
            isActive: true,
        })
            .populate("customer")
            .populate("rides");
        if (invoice) {
            res.status(201).json({
                success: true,
                message: "Invoice fetch Successfull",
                result: invoice,
            });
        }
        else {
            res.status(201).json({
                success: false,
                message: "Failed to fetch invoice",
                result: null,
            });
        }
    }
    catch (error) {
        res.status(201).json({
            success: false,
            message: "Failed to fetch invoice ",
            error: error,
        });
    }
});
exports.fetchInvoices = fetchInvoices;
