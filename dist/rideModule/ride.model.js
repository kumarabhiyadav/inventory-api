"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RideModel = exports.Ride = exports.CustomerType = void 0;
const typegoose_1 = require("@typegoose/typegoose");
var CustomerType;
(function (CustomerType) {
})(CustomerType = exports.CustomerType || (exports.CustomerType = {}));
class Ride {
}
__decorate([
    (0, typegoose_1.prop)({ trim: true }),
    __metadata("design:type", String)
], Ride.prototype, "truckNumber", void 0);
__decorate([
    (0, typegoose_1.prop)({ trim: true }),
    __metadata("design:type", String)
], Ride.prototype, "lrNo", void 0);
__decorate([
    (0, typegoose_1.prop)({}),
    __metadata("design:type", Date)
], Ride.prototype, "date", void 0);
__decorate([
    (0, typegoose_1.prop)({}),
    __metadata("design:type", String)
], Ride.prototype, "particular", void 0);
__decorate([
    (0, typegoose_1.prop)({}),
    __metadata("design:type", Number)
], Ride.prototype, "quantity", void 0);
__decorate([
    (0, typegoose_1.prop)({}),
    __metadata("design:type", Number)
], Ride.prototype, "rate", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: 0 }),
    __metadata("design:type", Number)
], Ride.prototype, "detention", void 0);
__decorate([
    (0, typegoose_1.prop)({}),
    __metadata("design:type", String)
], Ride.prototype, "customer", void 0);
__decorate([
    (0, typegoose_1.prop)({}),
    __metadata("design:type", String)
], Ride.prototype, "source", void 0);
__decorate([
    (0, typegoose_1.prop)({}),
    __metadata("design:type", String)
], Ride.prototype, "destination", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: true }),
    __metadata("design:type", Boolean)
], Ride.prototype, "isActive", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: false }),
    __metadata("design:type", Boolean)
], Ride.prototype, "isDeleted", void 0);
exports.Ride = Ride;
exports.RideModel = (0, typegoose_1.getModelForClass)(Ride, {
    schemaOptions: { timestamps: true },
});
