import { RequestHandler } from "express";
import { findAll } from "../../collections/offices/findAll";
import { authorization } from "../../middleware/authorization";

const getAllOfficesHandler: RequestHandler = async (req, res) => {
  try {
    const offices = await findAll();
    return res.status(200).json({ offices });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

export const getAllOffices: RequestHandler =
  authorization(getAllOfficesHandler);
