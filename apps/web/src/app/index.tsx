import * as React from "react";
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
            <Outlet />
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
