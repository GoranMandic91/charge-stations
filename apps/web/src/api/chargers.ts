import { API_URL } from "../config";
import { fetchJson } from "./fetch";

export interface ChargerParams {
  officeId: string;
  chargerId?: number;
  user?: { id?: string; name?: string };
}

export const postCharger = (
  data: ChargerParams,
  token: string
): Promise<void> =>
  fetchJson(`${API_URL}/chargers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(data),
  });

export const patchCharger = (
  data: ChargerParams,
  token: string
): Promise<void> =>
  fetchJson(`${API_URL}/chargers/${data.chargerId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(data),
  });
