import React from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout title="Admin Dashboard - The Reading Room">
      {/* Background */}
      <div className="container-fluid min-vh-100 px-3 py-5">
        <div className="row justify-content-center">
          {/* Sidebar */}
          <div className="col-lg-3 col-md-4 mb-4">
            <div className="bg-white rounded-4 shadow-lg p-3 h-100">
              <AdminMenu />
            </div>
          </div>

          {/* Content */}
          <div className="col-lg-8 col-md-8">
            <div className="bg-white rounded-4 shadow-lg p-4 p-md-5">
              <h3 className="fw-bold mb-4" style={{ color: "#1E293B" }}>
                Admin Profile
              </h3>

              <div className="mb-3">
                <label className="text-muted fw-semibold">Name</label>
                <div className="form-control rounded-3 py-2 bg-light">
                  {auth?.user?.name}
                </div>
              </div>

              <div className="mb-3">
                <label className="text-muted fw-semibold">Email</label>
                <div className="form-control rounded-3 py-2 bg-light">
                  {auth?.user?.email}
                </div>
              </div>

              <div className="mb-3">
                <label className="text-muted fw-semibold">Contact</label>
                <div className="form-control rounded-3 py-2 bg-light">
                  {auth?.user?.phone || "Not Provided"}
                </div>
              </div>

              <div className="mt-4">
                <span
                  className="badge px-3 py-2 text-white"
                  style={{
                    background:
                      "linear-gradient(135deg, #1E40AE 0%, #2563EB 100%)",
                  }}
                >
                  Administrator Access
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
