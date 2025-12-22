import React from "react";
import { Link } from "react-router-dom";
import Layout from "./../components/Layout/Layout";

const Pagenotfound = () => {
  return (
    <Layout title="Page Not Found">
      <div
        className="container-fluid d-flex align-items-center justify-content-center"
        style={{
          minHeight: "100vh",
          backgroundColor: "#F1F5F9",
        }}
      >
        <div className="text-center">
          <h1
            style={{
              fontSize: "96px",
              fontWeight: "800",
              color: "#1E40AF",
            }}
          >
            404
          </h1>

          <h3 className="fw-bold mb-2" style={{ color: "#0F172A" }}>
            Page Not Found
          </h3>

          <p className="mb-4" style={{ color: "#64748B" }}>
            Sorry, the page you are looking for doesn’t exist or has been moved.
          </p>

          <Link
            to="/"
            className="btn text-white px-4 py-2"
            style={{ backgroundColor: "#1E40AF" }}
          >
            Go Back to Home
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Pagenotfound;
