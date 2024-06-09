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
exports.SupplierModel = exports.Supplier = void 0;
const typegoose_1 = require("@typegoose/typegoose");
class Supplier {
}
__decorate([
    (0, typegoose_1.prop)({ trim: true }),
    __metadata("design:type", String)
], Supplier.prototype, "name", void 0);
__decorate([
    (0, typegoose_1.prop)({}),
    __metadata("design:type", String)
], Supplier.prototype, "address", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: "" }),
    __metadata("design:type", String)
], Supplier.prototype, "mobile", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: true }),
    __metadata("design:type", Boolean)
], Supplier.prototype, "isActive", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: false }),
    __metadata("design:type", Boolean)
], Supplier.prototype, "isDeleted", void 0);
exports.Supplier = Supplier;
exports.SupplierModel = (0, typegoose_1.getModelForClass)(Supplier, {
    schemaOptions: { timestamps: true },
});
