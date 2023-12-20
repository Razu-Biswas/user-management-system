"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
router.get("/", user_controller_1.UserControllers.getUsers);
router.get("/:userId", user_controller_1.UserControllers.getUserById);
router.post("/", user_controller_1.UserControllers.createUser);
router.put("/:userId", user_controller_1.UserControllers.updateUserById);
router.put("/:userId/orders", user_controller_1.UserControllers.createOrder);
router.get("/:userId/orders", user_controller_1.UserControllers.getOrderById);
router.get("/:userId/orders/total-price", user_controller_1.UserControllers.getOrderSum);
router.delete("/:userId", user_controller_1.UserControllers.deleteUser);
exports.UserRoutes = router;
