import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:4900/api/v1/auth/forgot-password",
        { email, newPassword, answer }
      );

      if (res?.data?.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Reset Password">
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
                    Reset Password
                  </h4>

                  <p className="text-center mb-4" style={{ color: "#64748B" }}>
                    Verify details to set a new password
                  </p>

                  <form onSubmit={handleSubmit}>
                    <input
                      type="email"
                      className="form-control mb-3"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />

                    <input
                      className="form-control mb-3"
                      placeholder="Favorite sport"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      required
                    />

                    <input
                      type="password"
                      className="form-control mb-4"
                      placeholder="New password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />

                    <button
                      type="submit"
                      className="btn w-100 py-2 fw-semibold text-white"
                      style={{ backgroundColor: "#1E40AF" }}
                    >
                      Reset Password
                    </button>
                  </form>

                  <p
                    className="text-center mt-3 mb-0"
                    style={{ color: "#64748B" }}
                  >
                    Remembered your password?{" "}
                    <span
                      style={{
                        color: "#1E40AF",
                        cursor: "pointer",
                        fontWeight: 600,
                      }}
                      onClick={() => navigate("/login")}
                    >
                      Login
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

export default ForgotPassword;
