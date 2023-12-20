"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderValidationSchema = void 0;
const zod_1 = require("zod");
const FullNameValidationSchema = zod_1.z.object({
    firstName: zod_1.z
        .string()
        .min(1, { message: "First name must not be empty" })
        .max(255, { message: "First name is too long" }),
    lastName: zod_1.z
        .string()
        .min(1, { message: "Last name must not be empty" })
        .max(255, { message: "Last name is too long" }),
});
const AddressValidationSchema = zod_1.z.object({
    street: zod_1.z
        .string()
        .min(1, { message: "Street must not be empty" })
        .max(255, { message: "Street name is too long" }),
    city: zod_1.z
        .string()
        .min(1, { message: "City must not be empty" })
        .max(255, { message: "City name is too long" }),
    country: zod_1.z
        .string()
        .min(1, { message: "Country must not be empty" })
        .max(255, { message: "Country name is too long" }),
});
exports.OrderValidationSchema = zod_1.z.object({
    productName: zod_1.z
        .string()
        .min(1, { message: "Product name must not be empty" })
        .max(255, { message: "Product name is too long" }),
    price: zod_1.z.number(),
    quantity: zod_1.z.number(),
});
// Define Zod schema for the User
const UserValidationSchema = zod_1.z.object({
    userId: zod_1.z.number(),
    username: zod_1.z
        .string()
        .min(1, { message: "Username must not be empty" })
        .max(255, { message: "Username is too long" }),
    password: zod_1.z
        .string()
        .min(1, { message: "Password must not be empty" })
        .max(255, { message: "Password is too long" }),
    fullName: FullNameValidationSchema,
    age: zod_1.z.number(),
    email: zod_1.z.string().email({ message: "Email must be a valid email address" }),
    isActive: zod_1.z.boolean(),
    hobbies: zod_1.z.array(zod_1.z
        .string()
        .min(1, { message: "Hobby must not be empty" })
        .max(255, { message: "Hobby is too long" })),
    address: AddressValidationSchema,
    isDelete: zod_1.z.boolean().optional(),
    order: zod_1.z.array(exports.OrderValidationSchema).optional(),
});
exports.default = UserValidationSchema;
