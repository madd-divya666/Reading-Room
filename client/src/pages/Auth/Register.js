import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const [standard, setStandard] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:4900/api/v1/auth/register",
        { name, email, password, phone, address, answer }
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
    <Layout title="Register">
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
                    Create Account
                  </h4>

                  <p className="text-center mb-4" style={{ color: "#64748B" }}>
                    Start learning with The Reading Room
                  </p>

                  <form onSubmit={handleSubmit}>
                    <input
                      className="form-control mb-3"
                      placeholder="Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />

                    <input
                      type="email"
                      className="form-control mb-3"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />

                    <input
                      type="password"
                      className="form-control mb-3"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />

                    <select
                      className="form-select mb-3"
                      onChange={(e) => setStandard(e.target.value)}
                    >
                      <option value="">Select Class</option>
                      <option value="Class 6-8">Class 6–8</option>
                      <option value="Class 9-10">Class 9–10</option>
                      <option value="Class 11-12">Class 11–12</option>
                      <option value="Above 12">Above 12</option>
                    </select>

                    <input
                      className="form-control mb-3"
                      placeholder="Phone Number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />

                    <input
                      className="form-control mb-3"
                      placeholder="Address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />

                    <input
                      className="form-control mb-4"
                      placeholder="Favorite sport"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      required
                    />

                    <button
                      className="btn w-100 py-2 fw-semibold text-white"
                      style={{ backgroundColor: "#1E40AF" }}
                    >
                      Create Account
                    </button>
                  </form>

                  <p
                    className="text-center mt-3 mb-0"
                    style={{ color: "#64748B" }}
                  >
                    Already have an account?{" "}
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

export default Register;
