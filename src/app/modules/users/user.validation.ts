import { boolean, z } from "zod";

const FullNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "First name must not be empty" })
    .max(255, { message: "First name is too long" }),
  lastName: z
    .string()
    .min(1, { message: "Last name must not be empty" })
    .max(255, { message: "Last name is too long" }),
});

const AddressValidationSchema = z.object({
  street: z
    .string()
    .min(1, { message: "Street must not be empty" })
    .max(255, { message: "Street name is too long" }),
  city: z
    .string()
    .min(1, { message: "City must not be empty" })
    .max(255, { message: "City name is too long" }),
  country: z
    .string()
    .min(1, { message: "Country must not be empty" })
    .max(255, { message: "Country name is too long" }),
});

export const OrderValidationSchema = z.object({
  productName: z
    .string()
    .min(1, { message: "Product name must not be empty" })
    .max(255, { message: "Product name is too long" }),
  price: z.number(),
  quantity: z.number(),
});

// Define Zod schema for the User
const UserValidationSchema = z.object({
  userId: z.number(),
  username: z
    .string()
    .min(1, { message: "Username must not be empty" })
    .max(255, { message: "Username is too long" }),
  password: z
    .string()
    .min(1, { message: "Password must not be empty" })
    .max(255, { message: "Password is too long" }),
  fullName: FullNameValidationSchema,
  age: z.number(),
  email: z.string().email({ message: "Email must be a valid email address" }),
  isActive: z.boolean(),
  hobbies: z.array(
    z
      .string()
      .min(1, { message: "Hobby must not be empty" })
      .max(255, { message: "Hobby is too long" })
  ),
  address: AddressValidationSchema,
  isDelete: z.boolean().optional(),
  order: z.array(OrderValidationSchema).optional(),
});

export default UserValidationSchema;
