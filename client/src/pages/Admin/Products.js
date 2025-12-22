import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  // get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4900/api/v1/product/get-product"
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout title="Admin • Products">
      <div
        className="container-fluid py-4"
        style={{ backgroundColor: "#F8FAFC" }}
      >
        <div className="container">
          <div className="row">
            {/* ===== ADMIN MENU ===== */}
            <div className="col-md-3 mb-4">
              <AdminMenu />
            </div>

            {/* ===== PRODUCTS ===== */}
            <div className="col-md-9">
              <h4 className="fw-bold mb-4 text-primary">All Products</h4>

              <div className="row g-4">
                {products?.map((p) => (
                  <div className="col-md-6 col-lg-4 col-xl-3" key={p._id}>
                    <Link
                      to={`/dashboard/admin/product/${p.slug}`}
                      style={{ textDecoration: "none" }}
                    >
                      <div
                        className="card h-100 border-0 rounded-4 admin-product-card"
                        style={{
                          boxShadow: "0 10px 30px rgba(15,23,42,0.08)",
                          transition: "all 0.25s ease",
                        }}
                      >
                        <img
                          src={`http://localhost:4900/api/v1/product/product-photo/${p._id}`}
                          alt={p.name}
                          className="card-img-top rounded-top-4"
                          style={{
                            height: "140px",
                            objectFit: "cover",
                          }}
                        />

                        <div className="card-body p-3 d-flex flex-column">
                          <h6 className="fw-semibold mb-1 text-dark">
                            {p.name}
                          </h6>

                          <p className="text-muted small mb-2">
                            {p.description.substring(0, 45)}...
                          </p>

                          <span className="mt-auto text-primary fw-semibold small">
                            Edit Product →
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Hover animation */}
        <style>
          {`
            .admin-product-card:hover {
              transform: translateY(-6px);
              box-shadow: 0 20px 40px rgba(15,23,42,0.15);
            }
          `}
        </style>
      </div>
    </Layout>
  );
};

export default Products;
