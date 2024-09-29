import { API_URL } from "../config";
import { fetchJson } from "./fetch";

export const postCharger = (data: any, token: string): Promise<any[]> =>
  fetchJson(`${API_URL}/chargers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(data),
  });
