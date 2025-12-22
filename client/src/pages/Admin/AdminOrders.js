import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";

const { Option } = Select;

const AdminOrders = () => {
  const [status] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancel",
  ]);

  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const getOrders = async () => {
    const { data } = await axios.get("/api/v1/auth/all-orders");
    setOrders(data);
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    await axios.put(`/api/v1/auth/order-status/${orderId}`, { status: value });
    getOrders();
  };

  return (
    <Layout title="All Orders - Admin">
      <div className="container-fluid py-5">
        <div className="container">
          <div className="row">
            {/* Sidebar */}
            <div className="col-md-3 mb-4">
              <div className="bg-white rounded-4 shadow-lg p-3">
                <AdminMenu />
              </div>
            </div>

            {/* Content */}
            <div className="col-md-9">
              <div className="bg-white rounded-4 shadow-lg p-4">
                <h3 className="fw-bold mb-4 text-center text-primary">
                  All Orders
                </h3>

                {orders.map((o, i) => (
                  <div key={o._id} className="border rounded-3 p-3 mb-4">
                    {/* Order Table */}
                    <div className="table-responsive">
                      <table className="table table-bordered align-middle mb-3">
                        <thead className="table-light">
                          <tr>
                            <th>#</th>
                            <th>Status</th>
                            <th>Buyer</th>
                            <th>Date</th>
                            <th>Payment</th>
                            <th>Qty</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{i + 1}</td>
                            <td>
                              <Select
                                className="w-100"
                                value={o.status}
                                onChange={(value) => handleChange(o._id, value)}
                              >
                                {status.map((s, idx) => (
                                  <Option key={idx} value={s}>
                                    {s}
                                  </Option>
                                ))}
                              </Select>
                            </td>
                            <td>{o?.buyer?.name}</td>
                            <td>{moment(o?.createAt).fromNow()}</td>
                            <td>
                              <span
                                className={`badge ${
                                  o?.payment?.success
                                    ? "bg-success"
                                    : "bg-danger"
                                }`}
                              >
                                {o?.payment?.success ? "Success" : "Failed"}
                              </span>
                            </td>
                            <td>{o?.products?.length}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Products */}
                    <div className="row g-3">
                      {o.products.map((p) => (
                        <div key={p._id} className="col-md-6 col-lg-4">
                          <div className="card h-100 shadow-sm">
                            <img
                              src={`/api/v1/product/product-photo/${p._id}`}
                              className="card-img-top"
                              alt={p.name}
                              style={{
                                height: "140px",
                                objectFit: "cover",
                              }}
                            />
                            <div className="card-body">
                              <h6 className="fw-semibold">{p.name}</h6>
                              <p className="small text-muted">
                                {p.description.substring(0, 40)}
                              </p>
                              <p className="fw-bold mb-0">${p.price}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
