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

export const patchCharger = (data: any, token: string): Promise<any[]> =>
  fetchJson(`${API_URL}/chargers/${data.chargerId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(data),
  });
