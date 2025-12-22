import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Spinner = ({ path = "login" }) => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    if (count === 0) {
      navigate(`/${path}`, {
        state: location.pathname,
      });
    }

    return () => clearInterval(interval);
  }, [count, navigate, location, path]);

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        backgroundColor: "#F1F5F9",
      }}
    >
      <div className="card border-0 shadow-sm text-center p-4">
        <div
          className="spinner-border mb-3"
          role="status"
          style={{ color: "#1E40AF" }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>

        <h5 className="fw-semibold mb-1">Redirecting you</h5>

        <p className="mb-0" style={{ color: "#64748B" }}>
          Please wait… redirecting in {count} second{count !== 1 && "s"}
        </p>
      </div>
    </div>
  );
};

export default Spinner;
