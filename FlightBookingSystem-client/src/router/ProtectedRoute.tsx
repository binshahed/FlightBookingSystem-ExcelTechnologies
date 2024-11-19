import { Navigate, useLocation } from "react-router-dom";

import { ReactNode } from "react";
import { useAppSelector } from "../store/hooks";
import { useCurrentToken } from "../store/features/auth/authSlice";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = useAppSelector(useCurrentToken);
  const { pathname } = useLocation();

  console.log("protected route", pathname);

  if (!token) {
    return <Navigate to="/login" replace state={{ from: pathname }} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
