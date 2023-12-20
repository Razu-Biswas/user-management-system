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
exports.UsersServices = void 0;
const user_models_1 = require("../user.models");
const createUserInToDb = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_models_1.User.create(userData);
    return result;
});
const getUsersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_models_1.User.find({ isDelete: false }, {
        username: 1,
        fullName: 1,
        age: 1,
        email: 1,
        address: 1,
    });
    return result;
});
const getUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_models_1.User.isUserExists(userId);
    return result;
});
const updateUserById = (userId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_models_1.User.updateUser(userId, updateData);
    return result;
});
const createOrder = (userId, orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_models_1.User.orderCreate(userId, orderData);
    return result;
});
const getOrderById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_models_1.User.getUserOrdersById(userId);
    return result;
});
const getOrderSum = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_models_1.User.getOrderSum(userId);
    return result;
});
const deleteUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_models_1.User.deleteUser(userId);
    return result;
});
exports.UsersServices = {
    createUserInToDb,
    getUsersFromDB,
    getUserById,
    updateUserById,
    createOrder,
    getOrderById,
    getOrderSum,
    deleteUser,
};
