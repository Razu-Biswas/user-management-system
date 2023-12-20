"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserControllers = void 0;
const user_service_1 = require("./user.service");
const user_validation_1 = __importStar(require("./user.validation"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        const zodValidationData = user_validation_1.default.parse(userData);
        const result = yield user_service_1.UsersServices.createUserInToDb(zodValidationData);
        const data = Object.assign({}, result);
        const _a = data._doc, { password } = _a, userWithoutPassword = __rest(_a, ["password"]);
        res.status(200).json({
            success: true,
            message: "User created successfully!",
            data: userWithoutPassword,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err.message || "Something went wrong!",
            data: null,
        });
    }
});
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.UsersServices.getUsersFromDB();
        res.status(200).json({
            success: true,
            message: "Users fetched successfully!",
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "Something went wrong!",
            data: err,
        });
    }
});
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield user_service_1.UsersServices.getUserById(userId);
        if (result) {
            res.status(200).json({
                success: true,
                message: "User fetched successfully!",
                data: result,
            });
        }
        else {
            res.status(400).json({
                success: false,
                message: "User not found!",
                error: {
                    code: 404,
                    description: "User not found!",
                },
            });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "User not found!",
            error: {
                code: 404,
                description: "User not found!",
            },
        });
    }
});
const updateUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const updateData = req.body;
        const result = yield user_service_1.UsersServices.updateUserById(userId, updateData);
        const data = Object.assign({}, result);
        const _b = data._doc, { password } = _b, userWithoutPassword = __rest(_b, ["password"]);
        res.status(200).json({
            success: true,
            message: "User updated successfully!",
            data: userWithoutPassword,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "User not found!",
            data: "User not found!",
        });
    }
});
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const orderData = req.body;
        const zodValidationData = user_validation_1.OrderValidationSchema.parse(orderData);
        const result = yield user_service_1.UsersServices.createOrder(userId, zodValidationData);
        if (result) {
            res.status(200).json({
                success: true,
                message: "Order created successfully!",
                data: null,
            });
        }
        else {
            res.status(400).json({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found!",
                },
            });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: "User not found!",
            },
        });
    }
});
const getOrderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield user_service_1.UsersServices.getOrderById(userId);
        const data = Object.assign({}, result);
        const _c = data._doc, { _id } = _c, userWithout_id = __rest(_c, ["_id"]);
        if (result) {
            res.status(200).json({
                success: true,
                message: "Order fetched successfully!",
                data: userWithout_id,
            });
        }
        else {
            res.status(400).json({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found!",
                },
            });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: "User not found!",
            },
        });
    }
});
const getOrderSum = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield user_service_1.UsersServices.getOrderSum(userId);
        const totalPrice = { totalPrice: result[0].totalPrice };
        if (result) {
            res.status(200).json({
                success: true,
                message: "Total price calculated successfully!",
                data: totalPrice,
            });
        }
        else {
            res.status(400).json({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found!",
                },
            });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: "User not found!",
            },
        });
    }
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield user_service_1.UsersServices.deleteUser(userId);
        if (result.modifiedCount === 1) {
            res.status(200).json({
                success: true,
                message: "User deleted successfully!",
                data: null,
            });
        }
        else {
            res.status(400).json({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found!",
                },
            });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: "User not found!",
            },
        });
    }
});
exports.UserControllers = {
    createUser,
    getUsers,
    getUserById,
    updateUserById,
    createOrder,
    getOrderById,
    getOrderSum,
    deleteUser,
};
