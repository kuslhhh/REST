import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    authentication: {
        password: { type: String, required: true, select: false },
        salt: { type: String, select: false },
        sessionToken: { type: String, select: false }
    }
});

export const userModel = mongoose.model("User", UserSchema);

export const getUsers = () => userModel.find();
export const getUserByEmail = (email: String) => userModel.findOne({ email })
export const getUserBySessionToken = (sessionToken: String) => userModel.findOne({
    "authentication.sessionToken": sessionToken
});

export const getUserById = (id: String) => userModel.findById(id);
export const createUser = (values: Record<string,any>) => new userModel(values).save().then((user) => user.toObject())
export const deleteUserById = (id: string) => userModel.findOneAndDelete({_id: id})
export const UpdateUserById = (id: string, values: Record<string, any> ) => userModel.findByIdAndUpdate(id,values)
