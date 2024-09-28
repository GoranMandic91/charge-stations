import { ObjectId } from "mongodb";
import { RequestHandler } from "express";
import { findAll } from "../../collections/offices/findAll";
import { authorization } from "../../middleware/authorization";

const getOfficeByIdHandler: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const office = await findAll({ _id: new ObjectId(id) });
    return res.status(200).json({ office });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

export const getOfficeById: RequestHandler =
  authorization(getOfficeByIdHandler);
