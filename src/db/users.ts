import mongoose from "mongoose";

interface AuthenticationObject {
  salt: string;
  password: string;
}

interface UserValues {
  email: string;
  username: string;
  authentication: AuthenticationObject;
}

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    username: { type: String, required: true },
    authentication: {
      password: { type: String, required: true, select: false },
      salt: { type: String, select: false },
      sessionToken: { type: String, select: false },
    },
  },
  {
    versionKey: false,
  },
);

export const UserModel = mongoose.model("User", UserSchema);

export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({ "authentication.sessionToken": sessionToken });
export const getUserById = (id: string) => UserModel.findById(id);
export const createUser = (values: UserValues) => new UserModel(values).save().then((user) => user.toObject());
export const deleteUserById = (id: string) => UserModel.findOneAndDelete({ _id: id });
