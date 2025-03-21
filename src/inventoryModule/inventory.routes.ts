import express, { Router } from "express";
import { createCategory,createProduct,createPurchase,createQRCode,createReport,createSubproduct, deleteCategory, deleteProduct, deletePurchase, deleteSubproduct, fetchCategories, fetchProducts, fetchPurchase, fetchSubProductPurchase, fetchSubProducts,getInventoryDetails,getProductByQR,getReports,searchSubProducts, sellProductQR } from "./inventory.controller";
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

InventoryRoutes.get("/deleteCategory", deleteCategory);
InventoryRoutes.get("/deleteProduct", deleteProduct);
InventoryRoutes.get("/deleteSubproduct", deleteSubproduct);

InventoryRoutes.delete("/deletePurchase/:id", deletePurchase);
InventoryRoutes.get("/fetchSubProductPurchase/:id", fetchSubProductPurchase);


// InventoryQR

InventoryRoutes.get("/getProductByQR/:id", getProductByQR);


InventoryRoutes.get("/sellProductQR/:id/:qyt/:cost/:note", sellProductQR);

InventoryRoutes.post("/createQRCode", createQRCode);


InventoryRoutes.get("/createReport", createReport);
InventoryRoutes.get("/getReport", getReports);
InventoryRoutes.get("/getInventoryDetails", getInventoryDetails);


















