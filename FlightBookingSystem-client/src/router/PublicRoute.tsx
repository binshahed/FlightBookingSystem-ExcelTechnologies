import { Navigate, useLocation } from "react-router-dom";

import { ReactNode } from "react";
import { useAppSelector } from "../store/hooks";
import { useCurrentToken } from "../store/features/auth/authSlice";

const PublicRoute = ({ children }: { children: ReactNode }) => {
  const token = useAppSelector(useCurrentToken);
  const { pathname } = useLocation();

  if (token) {
    return <Navigate to="/" replace state={{ from: pathname }} />;
  }

  return children;
};

export default PublicRoute;
