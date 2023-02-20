import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../authProvider/AuthProvider";
import useToken from "../../hooks/useToken";
import GoogleLogin from "../../shared/GoogleLogin";

const Login = () => {
  const { signIn, resetPassword } = useContext(AuthContext);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [loginError, setLoginError] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const [loginUserEmail, setLoginUserEmail] = useState("");
   const [token] = useToken(loginUserEmail);

   if (token) {
     navigate(from, { replace: true });
   }


  const handleLogin = (data) => {
    setLoginError(null);
    console.log(data);
    signIn(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setLoginUserEmail(user.email);
        toast.success("Successfully login..");
      })
      .catch((err) => {
        console.error(err.message);
        setLoginError(err.message);
        toast.error(err.message);
      });
  };

  const handleResetPassword = (data) => {
    console.log(data.email);
    resetPassword(data.email)
      .then(() => {
        toast.success("Check your email inbox or span folder..");
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="lg:w-1/3 md:w-1/2  shadow-xl rounded-xl p-7">
        <h2 className="text-xl text-center mb-6 font-semibold">Login</h2>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Email</span>
            </label>
            <input
              type="email"
              className="input input-bordered"
              {...register("email", { required: "Email is required." })}
            />
            {errors.email && (
              <p className="text-error text-sm">
                <small>{errors.email?.message}</small>
              </p>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Password</span>
            </label>
            <input
              type="password"
              className="input input-bordered"
              {...register("password", {
                required: "Password is required.",
                minLength: {
                  value: 6,
                  message: "Password must be 6 character long.",
                },
              })}
            />
            {errors.password && (
              <p className="text-error text-sm">
                <small>{errors.password?.message}</small>
              </p>
            )}
          </div>
          <label className="label">
            <span
              onClick={handleSubmit(handleResetPassword)}
              className="link link-hover text-xs"
            >
              Forget password?
            </span>
          </label>
          <div>
            {loginError && (
              <p className="text-error text-sm">
                <small>{loginError}</small>
              </p>
            )}
          </div>
          <div className="form-control mt-4">
            <input className="btn btn-primary" type="submit" value="Login" />
          </div>
        </form>
        <p className="text-center py-3 text-sm">
          New to SB Furniture?{" "}
          <Link to="/signUp" className="text-primary">
            Create new account
          </Link>
        </p>
        <div className="divider">OR</div>
        <div>
          <GoogleLogin></GoogleLogin>
        </div>
      </div>
    </div>
  );
};

export default Login;
