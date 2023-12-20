import { Schema, model } from "mongoose";
import { TOrder } from "./orders/orders.interface";

const OrderSchema = new Schema<TOrder>({
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


export const Order = model<TOrder>('order', OrderSchema)