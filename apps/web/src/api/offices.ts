import { API_URL } from "../config";
import { fetchJson } from "./fetch";

export const getOffices = (token: string): Promise<any[]> =>
  fetchJson(`${API_URL}/offices`, {
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
