import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { AuthContext } from "../authProvider/AuthProvider";
import { FaUser } from "react-icons/fa";
import useRole from "../hooks/useRole";

const NavBar = ({ dark, setDark }) => {
  const { user, logOut } = useContext(AuthContext);

  const [role] = useRole(user?.email);
  // console.log(role);
  // refetch();
  const handleLogOut = () => {
    logOut();
  };
  const menuItems = (
    <React.Fragment>
      <li className="font-semibold">
        <NavLink to="/">Home</NavLink>

        <NavLink to="/blogs">Blogs</NavLink>

        <NavLink to="/categories">Categories</NavLink>
      </li>
    </React.Fragment>
  );

  const menuItems2 = (
    <React.Fragment>
      <li tabIndex={0} className="z-10 font-semibold">
        {user?.uid && (
          <div className="justify-between">
            DashBoard
            <svg
              className="fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
            </svg>
          </div>
        )}
        <ul className="p-2 bg-base-100">
          {role?.type === "Buyer" && (
            <>
              <li>
                <Link to="/dashboard/wishlist">My Wishlist</Link>
                <Link to="/dashboard/myOrders">My Orders</Link>
              </li>
            </>
          )}

          {role?.type === "Seller" && (
            <>
              <li>
                <Link to="/dashboard/myProducts">My Products</Link>
                <Link to="/dashboard/addProducts">Add a Product</Link>
                <Link to="/dashboard/myBuyer">My Buyers</Link>
                <Link to="/dashboard/myAds">My Ads</Link>
              </li>
            </>
          )}

          {role?.type === "Admin" && (
            <>
              <li>
                <Link to="/dashboard/allSeller">All Sellers</Link>
                <Link to="/dashboard/allBuyer">All Buyers</Link>
              </li>
            </>
          )}
        </ul>
      </li>
      <li className="font-semibold">
        {user?.uid ? (
          <>
            <NavLink onClick={handleLogOut} to="/login">
              Logout
            </NavLink>
            <div className="border-l-2">
              <div className="avatar">
                <div className="w-4 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  {user?.photoUrl ? (
                    <img src={user?.photoURL} alt="" />
                  ) : (
                    <FaUser></FaUser>
                  )}
                </div>
              </div>
              <p>{user?.displayName}</p>
            </div>
          </>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </li>
      <div className="flex justify-center items-center lg:ml-2">
        <input
          onClick={() => setDark(!dark)}
          type="checkbox"
          className="toggle"
        />
      </div>
    </React.Fragment>
  );
  return (
    <div className="border-0 border-b border-warning py-3">
      <div className="navbar bg-base-100 justify-between">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={1}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {menuItems}
              {menuItems2}
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost normal-case text-xl">
            <div className="flex items-center">
              <img className="w-10 pr-2" src={logo} alt="" />
              <h2 className="font-bold">SB Furniture</h2>
            </div>
          </Link>
        </div>
        <div className="navbar-end hidden lg:w-full lg:flex">
          <ul className="menu menu-horizontal p-0">
            {menuItems}
            {menuItems2}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
