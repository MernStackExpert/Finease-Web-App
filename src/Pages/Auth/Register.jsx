import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  FaGoogle,
  FaUser,
  FaEnvelope,
  FaLock,
  FaImage,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { useAuthContext } from "../../Context/useAuthContext";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { googleLogin, createUser, updateUser, setLoading } = useAuthContext();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photoURL = form.photoURL.value;
    const password = form.password.value;

    if (!name || !email || !photoURL || !password) {
      toast.error("All fields are required");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      toast.error("Password must have one Uppercase letter");
      return;
    }
    if (!/(?=.*[a-z])/.test(password)) {
      toast.error("Password must have one Lowercase letter");
      return;
    }
    if (!/(?=.*[0-9])/.test(password)) {
      toast.error("Password must have one Number");
      return;
    }

    const curentUser = { displayName: name, photoURL };

    createUser(email, password)
      .then(() => {
        updateUser(curentUser)
          .then(() => {
            // toast.success("Registration Successful and profile updated!"); // ✅ success toast
            Swal.fire({
              position: "top-center",
              icon: "success",
              title: "Registration Successfull ✅",
              showConfirmButton: false,
              timer: 1500,
            });
            form.reset();
            navigate("/");
          })
          .catch((err) => toast.error("Profile update failed: " + err.message));
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then(() => {
        // toast("Login Successfull ✅");
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Registration Successfull ✅",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="hero min-h-screen bg-base-200 mt-15">
                  <title>FinEase - Auth - REGISTER</title>

      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left lg:ml-10">
          <h1 className="text-5xl font-bold">Register now!</h1>
          <p className="py-6">
            Join FinEase today. Start managing your personal finances like a pro
            and achieve your financial freedom.
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleRegister} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <FaUser />
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className="grow"
                />
              </label>
            </div>

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
                <span className="label-text">Photo URL</span>
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <FaImage />
                <input
                  type="text"
                  name="photoURL"
                  placeholder="http://..."
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
              <div className="label">
                <ul className="label-text-alt list-disc list-inside text-xs space-y-1">
                  <li>At least 6 characters long</li>
                  <li>One Uppercase letter (A-Z)</li>
                  <li>One Lowercase letter (a-z)</li>
                  <li>One Number (0-9)</li>
                </ul>
              </div>
            </div>

            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn btn-primary bg-gradient-to-r from-primary to-secondary text-white w-full"
              >
                Register
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
            Already have an account?{" "}
            <Link
              to={"/auth/login"}
              className="link link-primary font-semibold"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
