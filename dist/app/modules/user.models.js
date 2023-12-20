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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const argon2_1 = __importDefault(require("argon2"));
const FullNameSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
});
const AddressSchema = new mongoose_1.Schema({
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
});
const OrderSchema = new mongoose_1.Schema({
    productName: { type: String },
    price: { type: Number },
    quantity: { type: Number },
});
const UserSchema = new mongoose_1.Schema({
    userId: {
        type: Number,
        required: [true, "User Id is required!"],
    },
    username: { type: String, required: [true, "User name is required!"] },
    password: { type: String, required: [true, "Password is required!"] },
    fullName: {
        type: FullNameSchema,
        required: [true, "Full Name is required!"],
    },
    age: { type: Number, required: [true, "Age is required!"] },
    email: { type: String, required: [true, "Email is required!"], unique: true },
    isActive: { type: Boolean, required: [true, "Status is required!"] },
    hobbies: { type: [String], required: [true, "Hobbies are required!"] },
    address: { type: AddressSchema, required: [true, "Address is required!"] },
    isDelete: { type: Boolean, default: false },
    order: { type: [OrderSchema] },
});
UserSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const user = this;
        // To hash a password with bcrypt
        user.password = yield argon2_1.default.hash(user.password);
        next();
    });
});
// post save middleware/hook : will work on create() save()
UserSchema.post("save", function (doc, next) {
    doc.password = "";
    next();
});
// static method
UserSchema.statics.isUserExists = function (userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield exports.User.findOne({ userId: userId, isDelete: false }, { password: 0 });
        return existingUser;
    });
};
UserSchema.statics.updateUser = function (userId, updateData) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = { userId: userId, isDelete: false };
        const update = {
            userId: updateData.userId,
            username: updateData.username,
            password: updateData.password,
            fullName: updateData.fullName,
            age: updateData.age,
            email: updateData.email,
            isActive: updateData.isActive,
            hobbies: updateData.hobbies,
            address: updateData.address,
        };
        const updateUser = yield exports.User.findOneAndUpdate(query, update);
        return updateUser;
    });
};
UserSchema.statics.orderCreate = function (userId, orderData) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = { userId: userId, isDelete: false };
        const order = { $push: { order: orderData } };
        const createOrder = yield exports.User.findOneAndUpdate(query, order);
        return createOrder;
    });
};
UserSchema.statics.getUserOrdersById = function (userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const userOrder = yield exports.User.findOne({ userId: userId, isDelete: false }, { order: 1 });
        return userOrder;
    });
};
UserSchema.statics.getOrderSum = function (userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = parseFloat(userId);
        const sum = yield exports.User.aggregate([
            {
                $match: {
                    userId: id,
                    isDelete: false,
                },
            },
            {
                $unwind: "$order",
            },
            {
                $group: {
                    _id: "$order",
                    totalQuantity: { $sum: "$order.quantity" },
                    totalPrice: { $sum: "$order.price" },
                },
            },
            {
                $project: {
                    _id: 0,
                    totalQuantity: 1,
                    totalPrice: 1,
                    multiply: { $multiply: ["$totalPrice", "$totalQuantity"] },
                },
            },
            {
                $group: {
                    _id: null,
                    totalPrice: { $sum: "$multiply" },
                },
            },
        ]);
        return sum;
    });
};
UserSchema.statics.deleteUser = function (userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const deletedUser = yield exports.User.updateOne({ userId: userId, isDelete: false }, { isDelete: true });
        return deletedUser;
    });
};
exports.User = (0, mongoose_1.model)("User", UserSchema);
