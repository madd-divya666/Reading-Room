import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});

  useEffect(() => {
    if (params?.slug) getProductsByCategory();
  }, [params?.slug]);

  const getProductsByCategory = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:4900/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products || []);
      setCategory(data?.category || {});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={`Category - ${category?.name || ""}`}>
      {/* PAGE BG */}
      <div
        className="container-fluid py-4"
        style={{ backgroundColor: "#F1F5F9", minHeight: "100vh" }}
      >
        <div className="container">
          {/* HEADER */}
          <div className="text-center mb-4">
            <h3 className="fw-bold" style={{ color: "#0F172A" }}>
              {category?.name}
            </h3>
            <p style={{ color: "#64748B" }}>
              {products.length} result(s) found
            </p>
          </div>

          {/* PRODUCTS GRID */}
          <div className="row g-4">
            {products.map((p) => (
              <div className="col-sm-6 col-md-4 col-lg-3" key={p._id}>
                <div className="card border-0 shadow-sm h-100">
                  {/* IMAGE */}
                  <img
                    src={`http://localhost:4900/api/v1/product/product-photo/${p._id}`}
                    alt={p.name}
                    className="card-img-top"
                    style={{
                      height: "180px",
                      objectFit: "cover",
                    }}
                  />

                  {/* BODY */}
                  <div className="card-body d-flex flex-column">
                    <h6
                      className="fw-semibold mb-1"
                      style={{ color: "#0F172A" }}
                    >
                      {p.name}
                    </h6>

                    <p className="small mb-2" style={{ color: "#64748B" }}>
                      {p.description?.substring(0, 60)}...
                    </p>

                    <p className="fw-bold mb-3" style={{ color: "#1E40AF" }}>
                      {p.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </p>

                    <button
                      className="btn btn-sm text-white mt-auto"
                      style={{ backgroundColor: "#1E40AF" }}
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* EMPTY STATE */}
            {products.length === 0 && (
              <div className="col-12 text-center">
                <p style={{ color: "#64748B" }}>
                  No products available in this category.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
