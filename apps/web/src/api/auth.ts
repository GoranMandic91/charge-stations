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

export const postRegister = (
  email: string,
  password: string,
  fullName: string,
  role: string
): Promise<null> =>
  fetchJson(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, fullName, role }),
  });
