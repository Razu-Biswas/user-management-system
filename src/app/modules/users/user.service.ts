import { User } from "../user.models";
import { TOrder, TUser } from "./user.interfae";

const createUserInToDb = async (userData: TUser) => {
  const result = await User.create(userData);

  return result;
};

const getUsersFromDB = async () => {
  const result = await User.find(
    { isDelete: false },
    {
      username: 1,
      fullName: 1,
      age: 1,
      email: 1,
      address: 1,
    }
  );
  return result;
};

const getUserById = async (userId: string) => {
  const result = await User.isUserExists(userId);
  return result;
};

const updateUserById = async (userId: string, updateData: TUser) => {
  const result = await User.updateUser(userId, updateData);
  return result;
};

const createOrder = async (userId: string, orderData: TOrder) => {
  const result = await User.orderCreate(userId, orderData);
  return result;
};

const getOrderById = async (userId: string) => {
  const result = await User.getUserOrdersById(userId);
  return result;
};

const getOrderSum = async (userId: string) => {
  const result = await User.getOrderSum(userId);
  return result;
};

const deleteUser = async (userId: string) => {
  const result = await User.deleteUser(userId);
  return result;
};

export const UsersServices = {
  createUserInToDb,
  getUsersFromDB,
  getUserById,
  updateUserById,
  createOrder,
  getOrderById,
  getOrderSum,
  deleteUser,
};
