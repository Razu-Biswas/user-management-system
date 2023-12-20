import { Request, Response } from "express";
import { UsersServices } from "./user.service";
import UserValidationSchema, { OrderValidationSchema } from "./user.validation";

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const zodValidationData = UserValidationSchema.parse(userData);
    const result = await UsersServices.createUserInToDb(zodValidationData);
    const data = {
      ...result,
    };
    const { password, ...userWithoutPassword } = data._doc;
    res.status(200).json({
      success: true,
      message: "User created successfully!",
      data: userWithoutPassword,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || "Something went wrong!",
      data: null,
    });
  }
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await UsersServices.getUsersFromDB();
    res.status(200).json({
      success: true,
      message: "Users fetched successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong!",
      data: err,
    });
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UsersServices.getUserById(userId);

    if (result) {
      res.status(200).json({
        success: true,
        message: "User fetched successfully!",
        data: result,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "User not found!",
        error: {
          code: 404,
          description: "User not found!",
        },
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "User not found!",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  }
};

const updateUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const updateData = req.body;
    const result = await UsersServices.updateUserById(userId, updateData);
    const data = {
      ...result,
    };
    const { password, ...userWithoutPassword } = data._doc;
    res.status(200).json({
      success: true,
      message: "User updated successfully!",
      data: userWithoutPassword,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "User not found!",
      data: "User not found!",
    });
  }
};

const createOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const orderData = req.body;
    const zodValidationData = OrderValidationSchema.parse(orderData);
    const result = await UsersServices.createOrder(userId, zodValidationData);

    if (result) {
      res.status(200).json({
        success: true,
        message: "Order created successfully!",
        data: null,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "User not found",
        error: {
          code: 404,
          description: "User not found!",
        },
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  }
};

const getOrderById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UsersServices.getOrderById(userId);
    const data = {
      ...result,
    };
    const { _id, ...userWithout_id } = data._doc;
    if (result) {
      res.status(200).json({
        success: true,
        message: "Order fetched successfully!",
        data: userWithout_id,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "User not found",
        error: {
          code: 404,
          description: "User not found!",
        },
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  }
};
const getOrderSum = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UsersServices.getOrderSum(userId);

    const totalPrice = { totalPrice: result[0].totalPrice };

    if (result) {
      res.status(200).json({
        success: true,
        message: "Total price calculated successfully!",
        data: totalPrice,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "User not found",
        error: {
          code: 404,
          description: "User not found!",
        },
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UsersServices.deleteUser(userId);

    if (result.modifiedCount === 1) {
      res.status(200).json({
        success: true,
        message: "User deleted successfully!",
        data: null,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "User not found",
        error: {
          code: 404,
          description: "User not found!",
        },
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  }
};

export const UserControllers = {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  createOrder,
  getOrderById,
  getOrderSum,
  deleteUser,
};
