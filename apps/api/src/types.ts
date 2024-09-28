import { ObjectId } from "mongodb";

export interface UserDocument {
  _id: ObjectId;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: "regular" | "admin";
  createdAt: Date;
  updatedAt: Date;
}
