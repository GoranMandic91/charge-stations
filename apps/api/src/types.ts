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
  reservedBy: ChargingUser | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChargingUser {
  id: string;
  name: string;
}
export interface ChargerRequest {
  user: ChargingUser;
  officeId: string;
  chargerId: number;
  createdAt: Date;
}

export interface OfficeDocument {
  _id: ObjectId;
  name: string;
  location: string;
  chargers: Charger[];
  highDemandDuration: number;
  queue: ChargerRequest[];
  createdAt: Date;
  updatedAt: Date;
}

export interface SessionDocument {
  _id: ObjectId;
  userId: string;
  officeId: string;
  chargerId: string;
  queuedAt: Date;
  sessionStart: Date;
  sessionEnd: Date;
  sessionDuration: number;
  createdAt: Date;
  updatedAt: Date;
}
