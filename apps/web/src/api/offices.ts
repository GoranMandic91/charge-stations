import { API_URL } from "../config";
import { fetchJson } from "./fetch";
import { ChargingStatistics, Office } from "../store/offices";

export const getOffices = (token: string): Promise<{ offices: Office[] }> =>
  fetchJson(`${API_URL}/offices`, {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: token },
  });

export const getOfficeByID = (
  token: string,
  id: string
): Promise<{ office: Office[] }> =>
  fetchJson(`${API_URL}/offices/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: token },
  });

export const getOfficeStatisticsByID = (
  token: string,
  id: string
): Promise<ChargingStatistics> =>
  fetchJson(`${API_URL}/offices/${id}/statistics`, {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: token },
  });

export interface OfficeParams {
  name?: string;
  location?: string;
  numOfChargers?: string;
  highDemandDuration?: string;
}

export const postOffice = (
  params: OfficeParams,
  token: string
): Promise<{ offices: Office[] }[]> =>
  fetchJson(`${API_URL}/offices`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(params),
  });
