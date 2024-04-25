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
exports.fetchRides = exports.toggleActiveStatus = exports.deleteRide = exports.updateRide = exports.createRide = void 0;
const ride_model_1 = require("../rideModule/ride.model");
const createRide = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { truckNumber, lrNo, date, particular, quantity, rate, detention, customer, source, destination } = req.body;
    try {
        const ride = yield ride_model_1.RideModel.create({
            truckNumber,
            lrNo,
            date,
            particular,
            quantity,
            rate,
            detention,
            customer,
            source,
            destination
        });
        if (ride) {
            res.status(201).json({
                success: true,
                message: "Ride Create Successfull",
                result: ride,
            });
        }
        else {
            res.status(201).json({
                success: false,
                message: "Failed to create",
                result: null,
            });
        }
    }
    catch (error) {
        res.status(201).json({
            success: false,
            message: "Failed to create",
            error: error,
        });
    }
});
exports.createRide = createRide;
const updateRide = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { rideId, truckNumber, lrNo, date, particular, quantity, rate, detention, customer, } = req.body;
    try {
        const ride = yield ride_model_1.RideModel.findByIdAndUpdate(rideId, {
            truckNumber,
            lrNo,
            date,
            particular,
            quantity,
            rate,
            detention,
            customer,
        });
        if (ride) {
            res.status(201).json({
                success: true,
                message: "Ride update Successfull",
                result: ride,
            });
        }
        else {
            res.status(201).json({
                success: false,
                message: "Failed to update",
                result: null,
            });
        }
    }
    catch (error) {
        res.status(201).json({
            success: false,
            message: "Failed to update",
            error: error,
        });
    }
});
exports.updateRide = updateRide;
const deleteRide = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { rideId } = req.body;
    try {
        const ride = yield ride_model_1.RideModel.findByIdAndUpdate(rideId, {
            isDeleted: true,
        });
        if (ride) {
            res.status(201).json({
                success: true,
                message: "Ride deleted Successfull",
                result: ride,
            });
        }
        else {
            res.status(201).json({
                success: false,
                message: "Failed to deleted",
                result: null,
            });
        }
    }
    catch (error) {
        res.status(201).json({
            success: false,
            message: "Failed to deleted",
            error: error,
        });
    }
});
exports.deleteRide = deleteRide;
const toggleActiveStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { rideId, activeStatus } = req.body;
    try {
        const ride = yield ride_model_1.RideModel.findByIdAndUpdate(rideId, {
            isActive: activeStatus,
        });
        if (ride) {
            res.status(201).json({
                success: true,
                message: "Ride update Successfull",
                result: ride,
            });
        }
        else {
            res.status(201).json({
                success: false,
                message: "Failed to update",
                result: null,
            });
        }
    }
    catch (error) {
        res.status(201).json({
            success: false,
            message: "Failed to update",
            error: error,
        });
    }
});
exports.toggleActiveStatus = toggleActiveStatus;
const fetchRides = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ride = yield ride_model_1.RideModel.find({
            isDeleted: true,
        });
        if (ride) {
            res.status(201).json({
                success: true,
                message: "Ride update Successfull",
                result: ride,
            });
        }
        else {
            res.status(201).json({
                success: false,
                message: "Failed to update",
                result: null,
            });
        }
    }
    catch (error) {
        res.status(201).json({
            success: false,
            message: "Failed to update",
            error: error,
        });
    }
});
exports.fetchRides = fetchRides;
