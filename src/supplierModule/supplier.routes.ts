import express, { Router } from "express";
import { createSupplier,fetchSupplier } from "./supplier.controller";
export const SupplierRoutes: Router = express.Router();

SupplierRoutes.post("/createSupplier", createSupplier);
SupplierRoutes.get("/fetchSupplier", fetchSupplier);





