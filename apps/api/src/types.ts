import { ObjectId } from "mongodb";

export interface UserDocument {
  _id: ObjectId;
  email: string;
  fullName: string;
  password: string;
  role: "regular" | "admin";
  createdAt: Date;
  updatedAt: Date;
}

export interface Charger {
  id: number;
  available: boolean;
  sessionStart: Date | null;
  sessionEnd: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface OfficeDocument {
  _id: ObjectId;
  name: string;
  location: string;
  chargers: Charger[];
  highDemandDuration: number;
  createdAt: Date;
  updatedAt: Date;
}
