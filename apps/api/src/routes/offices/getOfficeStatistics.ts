import { RequestHandler } from "express";
import { authorization } from "../../middleware/authorization";
import { findSessionStatistics } from "../../collections/sessions/findSessionStatistics";

const getOfficeStatisticsHandler: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const statistics = await findSessionStatistics(id);
    return res.status(200).json(statistics);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

export const getOfficeStatistics: RequestHandler = authorization(
  getOfficeStatisticsHandler
);
