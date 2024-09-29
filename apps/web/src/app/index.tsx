import * as React from "react";
import { Paper } from "@mui/material";
import MenuAppBar from "../components/MenuAppBar";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import Office from "../pages/Office";
import Offices from "../pages/Offices";
import Register from "../pages/Register";
import { RequireAuth } from "../RequireAuth";
import { useAppSelector } from "../hooks/useAppSelector";

export default function App(): JSX.Element {
  const { user } = useAppSelector((state) => ({ user: state.auth.user }));
  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/login" replace={true} />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route
        element={
          <>
            <MenuAppBar />
            <Paper
              elevation={2}
              sx={{
                margin: 3,
                padding: 3,
                borderRadius: 8,
                background: "linear-gradient(135deg, #f5f5f5, #e0e0e0)",
                boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.15)",
                minHeight: "calc(100vh - 120px)",
                border: "1px solid #e0e0e0",
                transition: "box-shadow 0.3s ease",
                "&:hover": {
                  boxShadow: "0px 10px 35px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              <Outlet />
            </Paper>
          </>
        }
      >
        <Route
          path="/offices"
          element={
            <RequireAuth>
              <Offices />
            </RequireAuth>
          }
        />
        <Route
          path="/offices/:id"
          element={
            <RequireAuth>
              <Office />
            </RequireAuth>
          }
        />
      </Route>
      <Route path="*" element={<Navigate to="/offices" replace={true} />} />
    </Routes>
  );
}
