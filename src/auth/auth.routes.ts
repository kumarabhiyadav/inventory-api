import express, { Router } from "express";
import { login, signup } from "./auth.controllers";
export const AuthRoutes: Router = express.Router();

AuthRoutes.post("/login", login);
AuthRoutes.post("/signup", signup);

