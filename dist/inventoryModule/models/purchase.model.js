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
exports.PurchaseModel = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const supplier_model_1 = require("../../supplierModule/supplier.model");
const purchase_subproduct_model_1 = require("./purchase.subproduct.model");
class Purchase {
}
__decorate([
    (0, typegoose_1.prop)({ default: 0 }),
    __metadata("design:type", Number)
], Purchase.prototype, "totalCost", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: 0 }),
    __metadata("design:type", Number)
], Purchase.prototype, "additionalCost", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => purchase_subproduct_model_1.PurchaseSubProduct }),
    __metadata("design:type", Array)
], Purchase.prototype, "subProducts", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", Date)
], Purchase.prototype, "purchaseDate", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => supplier_model_1.Supplier }),
    __metadata("design:type", Object)
], Purchase.prototype, "supplier", void 0);
exports.PurchaseModel = (0, typegoose_1.getModelForClass)(Purchase, {
    schemaOptions: { timestamps: true },
});
