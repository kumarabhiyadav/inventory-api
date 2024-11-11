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
exports.InventoryModel = exports.Inventory = void 0;
const typegoose_1 = require("@typegoose/typegoose");
class Inventory {
}
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", Object)
], Inventory.prototype, "subProduct", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Inventory.prototype, "sku", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", Number)
], Inventory.prototype, "quantityChanged", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Inventory.prototype, "transactionType", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Inventory.prototype, "notes", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: 0 }),
    __metadata("design:type", Number)
], Inventory.prototype, "sellPrice", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", Number)
], Inventory.prototype, "newQuantity", void 0);
exports.Inventory = Inventory;
exports.InventoryModel = (0, typegoose_1.getModelForClass)(Inventory, {
    schemaOptions: { timestamps: true },
});
