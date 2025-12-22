import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";

const Dashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout title="Dashboard - The Reading Room">
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
                  Dashboard
                </h3>
                <p style={{ color: "#64748B" }}>
                  Manage your profile and learning preferences
                </p>
              </div>

              {/* PROFILE CARD */}
              <div
                className="card border-0 shadow-sm"
                style={{ backgroundColor: "#FFFFFF" }}
              >
                <div className="card-body p-4">
                  <h5 className="fw-semibold mb-3" style={{ color: "#0F172A" }}>
                    Profile Information
                  </h5>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label
                        className="form-label"
                        style={{ color: "#64748B" }}
                      >
                        Full Name
                      </label>
                      <div
                        className="form-control bg-light"
                        style={{ cursor: "not-allowed" }}
                      >
                        {auth?.user?.name || "N/A"}
                      </div>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label
                        className="form-label"
                        style={{ color: "#64748B" }}
                      >
                        Email Address
                      </label>
                      <div
                        className="form-control bg-light"
                        style={{ cursor: "not-allowed" }}
                      >
                        {auth?.user?.email || "N/A"}
                      </div>
                    </div>

                    <div className="col-md-12 mb-3">
                      <label
                        className="form-label"
                        style={{ color: "#64748B" }}
                      >
                        Address
                      </label>
                      <div
                        className="form-control bg-light"
                        style={{ cursor: "not-allowed" }}
                      >
                        {auth?.user?.address || "N/A"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* OPTIONAL STATS (FUTURE READY) */}
              <div className="row mt-4">
                <div className="col-md-4">
                  <div className="card border-0 shadow-sm text-center p-3">
                    <h4 className="fw-bold" style={{ color: "#1E40AF" }}>
                      0
                    </h4>
                    <p style={{ color: "#64748B" }}>Courses Enrolled</p>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="card border-0 shadow-sm text-center p-3">
                    <h4 className="fw-bold" style={{ color: "#1E40AF" }}>
                      0
                    </h4>
                    <p style={{ color: "#64748B" }}>Quizzes Attempted</p>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="card border-0 shadow-sm text-center p-3">
                    <h4 className="fw-bold" style={{ color: "#1E40AF" }}>
                      0%
                    </h4>
                    <p style={{ color: "#64748B" }}>Overall Progress</p>
                  </div>
                </div>
              </div>
              {/* END STATS */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
