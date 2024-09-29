import { API_URL } from "../config";
import { fetchJson } from "./fetch";
import { Office } from "../store/offices";

export const getOffices = (token: string): Promise<Office[]> =>
  fetchJson(`${API_URL}/offices`, {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: token },
  });

export const getOfficeByID = (token: string, id: string): Promise<Office[]> =>
  fetchJson(`${API_URL}/offices/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: token },
  });

export const getOfficeStatisticsByID = (
  token: string,
  id: string
): Promise<Office[]> =>
  fetchJson(`${API_URL}/offices/${id}/statistics`, {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: token },
  });

export const postOffice = (data: any, token: string): Promise<any[]> =>
  fetchJson(`${API_URL}/offices`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(data),
  });
