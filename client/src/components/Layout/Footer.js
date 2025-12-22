import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      className="mt-auto"
      style={{
        background:
          "linear-gradient(135deg, #1E40AE 0%, #2563EB 50%, #60A5FA 100%)",
        color: "#E5E7EB",
      }}
    >
      <div className="container py-4">
        {/* BRAND */}
        <h5 className="text-center fw-semibold mb-2">
          © {new Date().getFullYear()}{" "}
          <span style={{ color: "#DBEAFE", fontWeight: 700 }}>
            The Reading Room
          </span>
        </h5>

        {/* LINKS */}
        <div className="d-flex justify-content-center gap-3 flex-wrap">
          <Link
            to="/about"
            style={{
              color: "#DBEAFE",
              textDecoration: "none",
              fontSize: "14px",
            }}
          >
            About
          </Link>

          <span style={{ color: "#BFDBFE" }}>|</span>

          <Link
            to="/contact"
            style={{
              color: "#DBEAFE",
              textDecoration: "none",
              fontSize: "14px",
            }}
          >
            Contact
          </Link>

          <span style={{ color: "#BFDBFE" }}>|</span>

          <Link
            to="/policy"
            style={{
              color: "#DBEAFE",
              textDecoration: "none",
              fontSize: "14px",
            }}
          >
            Privacy Policy
          </Link>
        </div>

        {/* SUBTEXT */}
        <p
          className="text-center mt-3 mb-0"
          style={{
            fontSize: "0.9rem",
            color: "#E0F2FE",
            opacity: 0.9,
          }}
        >
          Empowering learners with quality study materials, courses, and live
          assessments.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
