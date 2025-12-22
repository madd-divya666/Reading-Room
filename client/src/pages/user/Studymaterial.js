import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";

const Studymaterial = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title="Study Material">
      {/* PAGE BACKGROUND */}
      <div
        className="container-fluid py-4"
        style={{ backgroundColor: "#F1F5F9", minHeight: "100vh" }}
      >
        <div className="container">
          {/* HEADER */}
          <div className="mb-4">
            <h3 className="fw-bold" style={{ color: "#0F172A" }}>
              Study Materials
            </h3>
            <p style={{ color: "#64748B" }}>
              Access your purchased PDF notes and reference materials
            </p>
          </div>

          {/* EMPTY STATE */}
          {orders?.length === 0 && (
            <div
              className="card border-0 shadow-sm p-4 text-center"
              style={{ backgroundColor: "#FFFFFF" }}
            >
              <p className="mb-0" style={{ color: "#64748B" }}>
                No study materials available yet.
              </p>
            </div>
          )}

          {/* MATERIAL LIST */}
          {orders?.map((order) =>
            order?.products
              ?.filter((p) => !p.content2)
              ?.map((p) => (
                <div
                  key={p._id}
                  className="card border-0 shadow-sm mb-4"
                  style={{ backgroundColor: "#FFFFFF" }}
                >
                  <div className="card-body">
                    <div className="row g-4 align-items-start">
                      {/* PDF PREVIEW */}
                      <div className="col-md-7">
                        <div className="ratio ratio-16x9 border rounded">
                          <embed
                            src={`/api/v1/product/product-content1/${p._id}`}
                            type="application/pdf"
                          />
                        </div>

                        <a
                          href={`/api/v1/product/product-content1/${p._id}`}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-sm mt-3 text-white"
                          style={{ backgroundColor: "#1E40AF" }}
                        >
                          Open PDF in New Tab
                        </a>
                      </div>

                      {/* DETAILS */}
                      <div className="col-md-5">
                        <h5
                          className="fw-semibold mb-2"
                          style={{ color: "#0F172A" }}
                        >
                          {p.name}
                        </h5>
                        <p style={{ color: "#64748B" }}>{p.description}</p>
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

export default Studymaterial;
