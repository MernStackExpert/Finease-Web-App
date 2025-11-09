import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import {
  FaGoogle,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthContext } from "../../Context/useAuthContext";
import Swal from "sweetalert2";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { loginUser, googleLogin , setLoading } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    if (!email || !password) {
      toast.error("Both email and password are required");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    loginUser(email, password)
      .then(() => {
        // toast.success("Login Successful!"); 
        Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Login Successfull ✅",
        showConfirmButton: false,
        timer: 1500,
      });
        form.reset();
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false)
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then(() => {
        Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Login Successfull ✅",
        showConfirmButton: false,
        timer: 1500,
      });
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false)
      });
  };

  return (
    <div className="hero min-h-screen bg-base-200">
            <title>FinEase - Auth - LOGIN</title>

      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left lg:ml-10">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Welcome back! Login to access your financial dashboard and manage
            your transactions.
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <FaEnvelope />
                <input
                  type="email"
                  name="email"
                  placeholder="email@example.com"
                  className="grow"
                />
              </label>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <FaLock />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  className="grow"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="cursor-pointer"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </label>
            </div>

            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn btn-primary bg-gradient-to-r from-primary to-secondary text-white w-full"
              >
                Login
              </button>
            </div>
          </form>

          <div className="divider px-8">OR</div>

          <div className="px-8 mb-4">
            <button
              onClick={handleGoogleLogin}
              className="btn btn-outline btn-primary w-full"
            >
              <FaGoogle />
              Continue with Google
            </button>
          </div>

          <p className="text-center mb-6">
            New to FinEase?{" "}
            <Link
              to={"/auth/register"}
              className="link link-primary font-semibold"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Login;
