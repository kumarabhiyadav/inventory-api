"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RideRoutes = void 0;
const express_1 = __importDefault(require("express"));
const ride_controllers_1 = require("./ride.controllers");
exports.RideRoutes = express_1.default.Router();
exports.RideRoutes.post("/createRide", ride_controllers_1.createRide);
exports.RideRoutes.post("/updateRide", ride_controllers_1.updateRide);
exports.RideRoutes.post("/deleteRide", ride_controllers_1.deleteRide);
exports.RideRoutes.post("/toggleActiveStatus", ride_controllers_1.toggleActiveStatus);
exports.RideRoutes.post("/fetchRides", ride_controllers_1.fetchRides);
