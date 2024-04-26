import express, { Router } from "express";
import { createCategory,createProduct,createPurchase,createSubproduct, deletePurchase, fetchCategories, fetchProducts, fetchPurchase, fetchSubProductPurchase, fetchSubProducts,searchSubProducts } from "./inventory.controller";
export const InventoryRoutes: Router = express.Router();

InventoryRoutes.post("/createCategory", createCategory);
InventoryRoutes.post("/createProduct", createProduct);
InventoryRoutes.post("/createSubproduct", createSubproduct);
InventoryRoutes.get("/fetchCategories", fetchCategories);
InventoryRoutes.get("/fetchProducts/category/:category", fetchProducts);
InventoryRoutes.get("/fetchSubProducts/product/:product", fetchSubProducts);
InventoryRoutes.get("/searchSubProducts", searchSubProducts);


InventoryRoutes.post("/createPurchase", createPurchase);
InventoryRoutes.get("/fetchPurchase", fetchPurchase);

InventoryRoutes.delete("/deletePurchase/:id", deletePurchase);
InventoryRoutes.get("/fetchSubProductPurchase/:id", fetchSubProductPurchase);

















