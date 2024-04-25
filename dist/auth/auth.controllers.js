"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = exports.login = void 0;
const User_model_1 = require("./User.model");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { email, password } = req.body;
    const user = yield User_model_1.UserModel.findOne({ email: email });
});
exports.login = login;
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, fullName, phone, countryCode, role } = req.body;
    let user = yield User_model_1.UserModel.findOne({ email: email, phone: phone });
    if (user) {
        res.status(401).json({
            success: false,
            message: "User Already Exists with this email and password",
        });
    }
    else {
        user = yield User_model_1.UserModel.create({
            email,
            countryCode,
            phone,
            fullName,
            role,
        });
        if (user) {
            res.status(201).json({
                success: true,
                message: "User has been created",
                result: user,
            });
        }
        else {
            res.status(401).json({
                success: false,
                message: "unable to create user",
            });
        }
    }
});
exports.signup = signup;
