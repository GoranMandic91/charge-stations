import * as React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "./hooks/useAppSelector";

export function RequireAuth({ children }: { children: JSX.Element }) {
  const { user } = useAppSelector((state) => ({
    user: state.auth.user,
  }));

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
