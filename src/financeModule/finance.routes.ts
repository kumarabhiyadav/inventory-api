import express, { Router } from "express";
import { createSales, fetchSales } from "./finance.controller";
export const FinanceRoutes: Router = express.Router();

FinanceRoutes.post("/createSales", createSales);
FinanceRoutes.get("/fetchSales", fetchSales);





