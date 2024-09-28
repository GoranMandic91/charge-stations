import { API_URL } from "../config";
import { fetchJson } from "./fetch";

export const postLogin = (email: string, password: string): Promise<null> =>
  fetchJson(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
