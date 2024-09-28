import * as React from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import { RequireAuth } from "../RequireAuth";
import { Protected } from "../pages/Protected";
import { useAppSelector } from "../hooks/useAppSelector";
import Register from "../pages/Register";
import MenuAppBar from "../components/MenuAppBar";

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
          path="/protected"
          element={
            <RequireAuth>
              <Protected />
            </RequireAuth>
          }
        />
      </Route>
      <Route path="*" element={<Navigate to="/protected" replace={true} />} />
    </Routes>
  );
}
