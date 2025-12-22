import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4900/api/v1/auth/login", {
        email,
        password,
      });

      if (res?.data?.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Login">
      {/* PAGE BACKGROUND */}
      <div
        className="container-fluid min-vh-100 d-flex align-items-center"
        style={{ backgroundColor: "#F1F5F9" }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5">
              {/* CARD */}
              <div
                className="card border-0 shadow-sm rounded-3"
                style={{ backgroundColor: "#FFFFFF" }}
              >
                <div className="card-body p-4 p-md-5">
                  <h4
                    className="fw-bold text-center mb-1"
                    style={{ color: "#0F172A" }}
                  >
                    Welcome Back
                  </h4>

                  <p className="text-center mb-4" style={{ color: "#64748B" }}>
                    Continue your learning journey
                  </p>

                  <form onSubmit={handleSubmit}>
                    {/* Email */}
                    <input
                      type="email"
                      className="form-control mb-3"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />

                    {/* Password */}
                    <input
                      type="password"
                      className="form-control mb-2"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />

                    {/* Forgot password */}
                    <div className="text-end mb-3">
                      <button
                        type="button"
                        className="btn btn-link p-0 text-decoration-none"
                        style={{ color: "#1E40AF" }}
                        onClick={() => navigate("/forgot-password")}
                      >
                        Forgot password?
                      </button>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      className="btn w-100 py-2 fw-semibold text-white"
                      style={{ backgroundColor: "#1E40AF" }}
                    >
                      Login
                    </button>
                  </form>

                  <p
                    className="text-center mt-3 mb-0"
                    style={{ color: "#64748B" }}
                  >
                    Don’t have an account?{" "}
                    <span
                      style={{
                        color: "#1E40AF",
                        cursor: "pointer",
                        fontWeight: 600,
                      }}
                      onClick={() => navigate("/register")}
                    >
                      Register
                    </span>
                  </p>
                </div>
              </div>
              {/* END CARD */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
