"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const inventory_controller_1 = require("./inventory.controller");
exports.InventoryRoutes = express_1.default.Router();
exports.InventoryRoutes.post("/createCategory", inventory_controller_1.createCategory);
exports.InventoryRoutes.post("/createProduct", inventory_controller_1.createProduct);
exports.InventoryRoutes.post("/createSubproduct", inventory_controller_1.createSubproduct);
exports.InventoryRoutes.get("/fetchCategories", inventory_controller_1.fetchCategories);
exports.InventoryRoutes.get("/fetchProducts/category/:category", inventory_controller_1.fetchProducts);
exports.InventoryRoutes.get("/fetchSubProducts/product/:product", inventory_controller_1.fetchSubProducts);
exports.InventoryRoutes.get("/searchSubProducts", inventory_controller_1.searchSubProducts);
exports.InventoryRoutes.post("/createPurchase", inventory_controller_1.createPurchase);
exports.InventoryRoutes.get("/fetchPurchase", inventory_controller_1.fetchPurchase);
exports.InventoryRoutes.get("/deleteCategory", inventory_controller_1.deleteCategory);
exports.InventoryRoutes.get("/deleteProduct", inventory_controller_1.deleteProduct);
exports.InventoryRoutes.get("/deleteSubproduct", inventory_controller_1.deleteSubproduct);
exports.InventoryRoutes.delete("/deletePurchase/:id", inventory_controller_1.deletePurchase);
exports.InventoryRoutes.get("/fetchSubProductPurchase/:id", inventory_controller_1.fetchSubProductPurchase);
exports.InventoryRoutes.get("/sellProductQR/:code/:pass/:qyt/:cost/:note", inventory_controller_1.sellProductQR);
exports.InventoryRoutes.post("/createQRCode", inventory_controller_1.createQRCode);
