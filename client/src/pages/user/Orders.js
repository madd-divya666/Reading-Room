import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";

const Orders = () => {
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
    <Layout title="Your Orders">
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
                  Order History
                </h3>
                <p style={{ color: "#64748B" }}>
                  View your past purchases and order details
                </p>
              </div>

              {/* EMPTY STATE */}
              {orders?.length === 0 && (
                <div
                  className="card border-0 shadow-sm p-4 text-center"
                  style={{ backgroundColor: "#FFFFFF" }}
                >
                  <p className="mb-0" style={{ color: "#64748B" }}>
                    You have not placed any orders yet.
                  </p>
                </div>
              )}

              {/* ORDERS LIST */}
              {orders?.map((order, index) => (
                <div
                  key={order._id}
                  className="card border-0 shadow-sm mb-4"
                  style={{ backgroundColor: "#FFFFFF" }}
                >
                  <div className="card-body">
                    {/* ORDER SUMMARY */}
                    <div className="row mb-3">
                      <div className="col-md-3">
                        <p className="mb-1" style={{ color: "#64748B" }}>
                          Order #
                        </p>
                        <p className="fw-semibold">{index + 1}</p>
                      </div>

                      <div className="col-md-3">
                        <p className="mb-1" style={{ color: "#64748B" }}>
                          Buyer
                        </p>
                        <p className="fw-semibold">{order?.buyer?.name}</p>
                      </div>

                      <div className="col-md-3">
                        <p className="mb-1" style={{ color: "#64748B" }}>
                          Date
                        </p>
                        <p className="fw-semibold">
                          {moment(order?.createdAt).fromNow()}
                        </p>
                      </div>

                      <div className="col-md-3">
                        <p className="mb-1" style={{ color: "#64748B" }}>
                          Payment
                        </p>
                        <span
                          className={`badge ${
                            order?.payment?.success ? "bg-success" : "bg-danger"
                          }`}
                        >
                          {order?.payment?.success ? "Success" : "Failed"}
                        </span>
                      </div>
                    </div>

                    <hr />

                    {/* PRODUCTS */}
                    {order?.products?.map((p) => (
                      <div key={p._id} className="row align-items-center mb-3">
                        <div className="col-md-2">
                          <img
                            src={`http://localhost:4900/api/v1/product/product-photo/${p._id}`}
                            alt={p.name}
                            className="img-fluid rounded border"
                            style={{ maxHeight: "80px" }}
                          />
                        </div>

                        <div className="col-md-7">
                          <p className="fw-semibold mb-1">{p.name}</p>
                          <p className="mb-0" style={{ color: "#64748B" }}>
                            {p.description.substring(0, 60)}...
                          </p>
                        </div>

                        <div className="col-md-3 text-md-end">
                          <p className="fw-semibold mb-0">₹ {p.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              {/* END ORDERS */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
