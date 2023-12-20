import { Schema, model } from "mongoose";
import {
  TAddress,
  TFullName,
  TOrder,
  TUser,
  UserModel,
} from "./users/user.interfae";
import argon2 from "argon2";

const FullNameSchema = new Schema<TFullName>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const AddressSchema = new Schema<TAddress>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});

const OrderSchema = new Schema<TOrder>({
  productName: { type: String },
  price: { type: Number },
  quantity: { type: Number },
});

const UserSchema = new Schema<TUser, UserModel>({
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

UserSchema.pre("save", async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  // To hash a password with bcrypt
  user.password = await argon2.hash(user.password);
  next();
});

// post save middleware/hook : will work on create() save()

UserSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

// static method
UserSchema.statics.isUserExists = async function (userId: string) {
  const existingUser = await User.findOne(
    { userId: userId, isDelete: false },
    { password: 0 }
  );
  return existingUser;
};

UserSchema.statics.updateUser = async function (userId: string, updateData) {
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
  const updateUser = await User.findOneAndUpdate(query, update);
  return updateUser;
};

UserSchema.statics.orderCreate = async function (userId: string, orderData) {
  const query = { userId: userId, isDelete: false };
  const order = { $push: { order: orderData } };
  const createOrder = await User.findOneAndUpdate(query, order);
  return createOrder;
};

UserSchema.statics.getUserOrdersById = async function (userId: string) {
  const userOrder = await User.findOne(
    { userId: userId, isDelete: false },
    { order: 1 }
  );
  return userOrder;
};
UserSchema.statics.getOrderSum = async function (userId: string) {
  const id = parseFloat(userId);
  const sum = await User.aggregate([
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
};

UserSchema.statics.deleteUser = async function (userId: string) {
  const deletedUser = await User.updateOne(
    { userId: userId, isDelete: false },
    { isDelete: true }
  );
  return deletedUser;
};

export const User = model<TUser, UserModel>("User", UserSchema);
