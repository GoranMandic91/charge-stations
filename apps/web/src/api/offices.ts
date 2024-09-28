import { API_URL } from "../config";
import { fetchJson } from "./fetch";

export const getOffices = (token: string): Promise<any[]> =>
  fetchJson(`${API_URL}/offices`, {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: token },
  });
