import * as React from "react";
import { Routes, Route, Outlet } from "react-router-dom";

import Login from "../pages/Login";
import { RequireAuth } from "../RequireAuth";
import { Protected } from "../pages/Protected";
import { useAppSelector } from "../hooks/useAppSelector";

export default function App(): JSX.Element {
  const { user } = useAppSelector((state) => ({ user: state.auth.user }));
  if (!user) {
    return <Login />;
  }

  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path="/protected"
          element={
            <RequireAuth>
              <Protected />
            </RequireAuth>
          }
        />
      </Route>
    </Routes>
  );
}
