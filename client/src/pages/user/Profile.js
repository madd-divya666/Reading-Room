import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import axios from "axios";

const Profile = () => {
  const [auth, setAuth] = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const { name, email, phone, address } = auth?.user || {};
    setName(name || "");
    setEmail(email || "");
    setPhone(phone || "");
    setAddress(address || "");
  }, [auth?.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("/api/v1/auth/profile", {
        name,
        email,
        password,
        phone,
        address,
      });

      if (data?.error) {
        toast.error(data.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });

        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));

        toast.success("Profile updated successfully");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Your Profile">
      {/* PAGE BACKGROUND */}
      <div
        className="container-fluid py-4"
        style={{ backgroundColor: "#F1F5F9", minHeight: "100vh" }}
      >
        <div className="container">
          <div className="row">
            {/* LEFT MENU */}
            <div className="col-md-3 mb-3">
              <UserMenu />
            </div>

            {/* MAIN CONTENT */}
            <div className="col-md-9">
              {/* HEADER */}
              <div className="mb-4">
                <h3 className="fw-bold" style={{ color: "#0F172A" }}>
                  Profile Settings
                </h3>
                <p style={{ color: "#64748B" }}>
                  Update your personal information
                </p>
              </div>

              {/* PROFILE FORM CARD */}
              <div
                className="card border-0 shadow-sm"
                style={{ backgroundColor: "#FFFFFF" }}
              >
                <div className="card-body p-4">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label text-muted">
                          Full Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label text-muted">
                          Email Address
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          value={email}
                          disabled
                          style={{ backgroundColor: "#F8FAFC" }}
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label text-muted">
                          New Password
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Leave blank to keep current password"
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label text-muted">
                          Phone Number
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>

                      <div className="col-md-12 mb-4">
                        <label className="form-label text-muted">Address</label>
                        <input
                          type="text"
                          className="form-control"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="btn px-4 py-2 text-white"
                      style={{ backgroundColor: "#1E40AF" }}
                    >
                      Update Profile
                    </button>
                  </form>
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

export default Profile;
