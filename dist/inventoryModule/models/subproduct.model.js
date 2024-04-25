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
exports.SubProductModel = exports.SubProduct = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const category_model_1 = require("./category.model");
const product_model_1 = require("./product.model");
class SubProduct {
}
__decorate([
    (0, typegoose_1.prop)({ trim: true }),
    __metadata("design:type", String)
], SubProduct.prototype, "name", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => category_model_1.Category }),
    __metadata("design:type", Object)
], SubProduct.prototype, "category", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => product_model_1.Product }),
    __metadata("design:type", Object)
], SubProduct.prototype, "product", void 0);
exports.SubProduct = SubProduct;
exports.SubProductModel = (0, typegoose_1.getModelForClass)(SubProduct, {
    schemaOptions: { timestamps: true },
});
