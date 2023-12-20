"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const OrderSchema = new mongoose_1.Schema({
    userId: {
        type: Number
    },
    productName: {
        type: String,
        required: [true, 'Product is required.'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required.'],
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required.'],
    },
});
exports.Order = (0, mongoose_1.model)('order', OrderSchema);
