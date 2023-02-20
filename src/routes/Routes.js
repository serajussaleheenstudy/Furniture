import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import Main from "../layouts/Main";
import SecondLayout from "../layouts/SecondLayout";
import BLogs from "../pages/Blogs/Blogs";
import Categories from "../pages/Categories/Categories";
import CategoryProducts from "../pages/Categories/CategoryCard/CategoryProducts/CategoryProducts";
import ProductDetails from "../pages/Categories/ProductDetails/ProductDetails";
import AddProducts from "../pages/Dashboard/AddProducts/AddProducts";
import AllBuyer from "../pages/Dashboard/AllBuyer/AllBuyer";
import AllSeller from "../pages/Dashboard/AllSeller/AllSeller";
import MyAds from "../pages/Dashboard/MyAds/MyAds";
import MyBuyer from "../pages/Dashboard/MyBuyer/MyBuyer";
import MyOrders from "../pages/Dashboard/MyOrders/MyOrders";
import MyProducts from "../pages/Dashboard/MyProducts/MyProducts";
import UpdateProduct from "../pages/Dashboard/MyProducts/UpdateProduct/UpdateProduct";
import MyWishlist from "../pages/Dashboard/MyWishlist/MyWishlist";
import Payment from "../pages/Dashboard/MyWishlist/Payment/Payment";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import DisplayError from "../shared/DisplayError";
import BossRoute from "./BossRoute";
import PrivateRoute from "./PrivateRoute";
import SellerRoute from "./SellerRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <DisplayError></DisplayError>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/blogs",
        element: <BLogs></BLogs>,
      },
      {
        path: "/categories",
        element: <Categories></Categories>,
      },
      {
        path: "/categories/products/:id",
        element: <CategoryProducts></CategoryProducts>,
        loader: async ({ params }) =>
          fetch(
            ` https://sb-furniture-server-side.vercel.app/categories/products?cat_id=${params.id}`
          ),
      },
      {
        path: "/product/:id",
        element: <ProductDetails></ProductDetails>,
        loader: async ({ params }) =>
          fetch(
            ` https://sb-furniture-server-side.vercel.app/product/${params.id}`
          ),
      },
    ],
  },
  {
    path: "/",
    element: <SecondLayout></SecondLayout>,
    errorElement: <DisplayError></DisplayError>,
    children: [
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signUp",
        element: <SignUp></SignUp>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    errorElement: <DisplayError></DisplayError>,
    children: [
      {
        path: "/dashboard/wishlist",
        element: <MyWishlist></MyWishlist>,
      },
      {
        path: "/dashboard/payment/:id",
        element: <Payment></Payment>,
        loader: async ({ params }) =>
          fetch(
            ` https://sb-furniture-server-side.vercel.app/booking/${params.id}`
          ),
      },
      {
        path: "/dashboard/myOrders",
        element: <MyOrders></MyOrders>,
      },
      {
        path: "/dashboard/myProducts",
        element: (
          <SellerRoute>
            <MyProducts></MyProducts>
          </SellerRoute>
        ),
      },
      {
        path: "/dashboard/updateProduct/:id",
        element: (
          <SellerRoute>
            <UpdateProduct></UpdateProduct>
          </SellerRoute>
        ),
        loader: async ({ params }) =>
          fetch(
            ` https://sb-furniture-server-side.vercel.app/product/${params.id}`
          ),
      },
      {
        path: "/dashboard/myBuyer",
        element: (
          <SellerRoute>
            <MyBuyer></MyBuyer>
          </SellerRoute>
        ),
      },
      {
        path: "/dashboard/myAds",
        element: (
          <SellerRoute>
            <MyAds></MyAds>
          </SellerRoute>
        ),
      },
      {
        path: "/dashboard/addProducts",
        element: (
          <SellerRoute>
            <AddProducts></AddProducts>
          </SellerRoute>
        ),
      },
      {
        path: "/dashboard/allSeller",
        element: (
          <BossRoute>
            <AllSeller></AllSeller>
          </BossRoute>
        ),
      },
      {
        path: "/dashboard/allBuyer",
        element: (
          <BossRoute>
            <AllBuyer></AllBuyer>
          </BossRoute>
        ),
      },
    ],
  },
]);
