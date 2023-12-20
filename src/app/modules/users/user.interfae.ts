import { Model } from "mongoose";

export type TFullName = {
  firstName: string;
  lastName: string;
};

export type TAddress = {
  street: string;
  city: string;
  country: string;
};

export type TOrder = {
  productName: string;
  price: number;
  quantity: number;
};

export type TUser = {
  userId: number;
  username: string;
  password: string;
  fullName: TFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: TAddress;
  isDelete: boolean;
  order?: [TOrder];
};

export interface UserModel extends Model<TUser> {
  isUserExists(userId: string): Promise<TUser | null>;
  updateUser(userId: string, updateData: TUser): Promise<TUser | null>;
  orderCreate(userId: string, orderData: TOrder): Promise<TOrder | null>;
  getUserOrdersById(userId: string): Promise<TOrder | null>;
  getOrderSum(userId: string): Promise<TOrder | null>;
  deleteUser(userId: string): Promise<TUser | null>;
}
