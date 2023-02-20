import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../authProvider/AuthProvider";
import useRole from "../hooks/useRole";

const BossRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useContext(AuthContext);
  console.log(user);
  const [role, isLoading] = useRole(user.email);
  if (loading || isLoading) {
    return <progress className="progress w-full"></progress>;
  }
  if (user && role.type === "Admin") {
    return children ;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default BossRoute;
