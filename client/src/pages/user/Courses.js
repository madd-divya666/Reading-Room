import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";

const Courses = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4900/api/v1/auth/orders"
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title="My Learning">
      {/* PAGE BACKGROUND */}
      <div
        className="container-fluid py-4"
        style={{ backgroundColor: "#F1F5F9", minHeight: "100vh" }}
      >
        <div className="container">
          {/* PAGE HEADER */}
          <div className="mb-4">
            <h3 className="fw-bold" style={{ color: "#0F172A" }}>
              My Learning
            </h3>
            <p style={{ color: "#64748B" }}>
              Access your purchased courses, lectures, and study materials
            </p>
          </div>

          {/* CONTENT */}
          {orders?.length === 0 && (
            <div
              className="card border-0 shadow-sm p-4 text-center"
              style={{ backgroundColor: "#FFFFFF" }}
            >
              <p className="mb-0" style={{ color: "#64748B" }}>
                You have not purchased any courses yet.
              </p>
            </div>
          )}

          {orders?.map((order) =>
            order?.products
              ?.filter((p) => p.content2)
              ?.map((p) => (
                <div
                  className="card border-0 shadow-sm mb-4"
                  key={p._id}
                  style={{ backgroundColor: "#FFFFFF" }}
                >
                  <div className="card-body">
                    <div className="row g-4">
                      {/* VIDEO / MAIN CONTENT */}
                      <div className="col-md-8">
                        <h5
                          className="fw-semibold mb-2"
                          style={{ color: "#0F172A" }}
                        >
                          {p.name}
                        </h5>
                        <p style={{ color: "#64748B" }}>{p.description}</p>

                        <div className="ratio ratio-16x9 mb-3">
                          <embed
                            src={`http://localhost:4900/api/v1/product/product-content2/${p._id}`}
                            type="application/pdf"
                          />
                        </div>

                        <a
                          href={`http://localhost:4900/api/v1/product/product-content2/${p._id}`}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-sm text-white"
                          style={{ backgroundColor: "#1E40AF" }}
                        >
                          Open Lecture in New Tab
                        </a>
                      </div>

                      {/* NOTES / PDF */}
                      <div className="col-md-4">
                        <p
                          className="fw-semibold mb-2"
                          style={{ color: "#0F172A" }}
                        >
                          Lecture Notes
                        </p>

                        <div className="ratio ratio-1x1 border">
                          <embed
                            src={`http://localhost:4900/api/v1/product/product-content1/${p._id}`}
                            type="application/pdf"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Courses;
