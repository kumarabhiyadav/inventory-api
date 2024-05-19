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
exports.PurchaseSubProductModel = exports.PurchaseSubProduct = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const subproduct_model_1 = require("./subproduct.model");
const supplier_model_1 = require("../../supplierModule/supplier.model");
class PurchaseSubProduct {
}
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], PurchaseSubProduct.prototype, "id", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", Number)
], PurchaseSubProduct.prototype, "cost", void 0);
__decorate([
    (0, typegoose_1.prop)({}),
    __metadata("design:type", String)
], PurchaseSubProduct.prototype, "image", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => subproduct_model_1.SubProduct }),
    __metadata("design:type", Object)
], PurchaseSubProduct.prototype, "subproduct", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => supplier_model_1.Supplier }),
    __metadata("design:type", Object)
], PurchaseSubProduct.prototype, "supplier", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, default: 0 }),
    __metadata("design:type", Number)
], PurchaseSubProduct.prototype, "mrp", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, default: 0 }),
    __metadata("design:type", Number)
], PurchaseSubProduct.prototype, "sellingprice", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], PurchaseSubProduct.prototype, "name", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], PurchaseSubProduct.prototype, "unit", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", Number)
], PurchaseSubProduct.prototype, "quantity", void 0);
exports.PurchaseSubProduct = PurchaseSubProduct;
exports.PurchaseSubProductModel = (0, typegoose_1.getModelForClass)(PurchaseSubProduct, {
    schemaOptions: { timestamps: true },
});
