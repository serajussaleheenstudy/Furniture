import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../authProvider/AuthProvider";

import useRole from "../hooks/useRole";

const SellerRoute = ({ children }) => {
  const location = useLocation();
    const { user, loading } = useContext(AuthContext);
    // console.log(user);
  const [role, isSellerLoading] = useRole(user.email);

  if (loading || isSellerLoading) {
    return <progress className="progress w-full"></progress>;
  }
  if (user && role.type === "Seller") {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default SellerRoute;
