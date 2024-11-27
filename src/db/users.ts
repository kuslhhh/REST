import mongoose from "mongoose";
import crypto from "crypto";

// Define the User schema
const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    authentication: {
      password: { type: String, required: true, select: false },
      salt: { type: String, select: false },
      sessionToken: { type: String, select: false },
    },
  },
  { timestamps: true }
);

// Export the User model
export const userModel = mongoose.model("User", UserSchema);

// Utility functions for user operations
export const getUsers = () => userModel.find();
export const getUserByEmail = (email: string) => userModel.findOne({ email });
export const getUserBySessionToken = (sessionToken: string) =>
  userModel.findOne({ "authentication.sessionToken": sessionToken });
export const getUserById = (id: string) => userModel.findById(id);
export const createUser = async (values: Record<string, any>) => {
  const salt = crypto.randomBytes(16).toString("hex");
  const hashedPassword = crypto
    .pbkdf2Sync(values.password, salt, 1000, 64, "sha512")
    .toString("hex");

  const user = new userModel({
    ...values,
    authentication: {
      password: hashedPassword,
      salt,
      sessionToken: crypto.randomBytes(64).toString("hex"),
    },
  });

  return user.save().then((user) => user.toObject());
};
export const deleteUserById = (id: string) =>
  userModel.findOneAndDelete({ _id: id });
export const updateUserById = (id: string, values: Record<string, any>) =>
  userModel.findByIdAndUpdate(id, values);
