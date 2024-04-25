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
exports.verifyJwtToken = exports.createAccessToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const User_model_1 = require("../../auth/User.model");
const createAccessToken = (userId, type) => __awaiter(void 0, void 0, void 0, function* () {
    let token = (0, jsonwebtoken_1.sign)({ userId, type }, process.env.ACCESS_TOKEN_SECRET, {});
    return token;
});
exports.createAccessToken = createAccessToken;
const verifyJwtToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorization = req.headers.authorization || "";
        if (authorization) {
            const token = authorization.split(" ")[1];
            const payload = yield (0, jsonwebtoken_1.verify)(token, process.env.ACCESS_TOKEN_SECRET);
            if (payload.type != undefined) {
                let user;
                user = yield User_model_1.UserModel.findById(payload.userId);
                if (user != null) {
                    req.body.user = user._id;
                    req.body.userRole = payload.type;
                    return next();
                }
                else {
                    res
                        .status(401)
                        .json({ success: false, message: "You are not authenticated." });
                }
            }
            else {
                res
                    .status(401)
                    .json({ success: false, message: "You are not authenticated." });
            }
        }
        else {
            res
                .status(401)
                .json({ success: false, message: "You are not authenticated." });
        }
    }
    catch (error) {
        res
            .status(401)
            .json({ success: false, message: "You are not authenticated." });
    }
});
exports.verifyJwtToken = verifyJwtToken;
