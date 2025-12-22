import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox, Radio, Skeleton } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "./../components/Layout/Layout";
import {
  AiOutlineReload,
  AiFillStar,
  AiOutlineStar,
  AiFillHeart,
} from "react-icons/ai";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  /* ================= API ================= */

  const getAllCategory = async () => {
    const { data } = await axios.get(
      "http://localhost:4900/api/v1/category/get-category"
    );
    if (data?.success) setCategories(data.category);
  };

  const getTotal = async () => {
    const { data } = await axios.get(
      "http://localhost:4900/api/v1/product/product-count"
    );
    setTotal(data?.total);
  };

  const getAllProducts = async () => {
    setLoading(true);
    const { data } = await axios.get(
      `http://localhost:4900/api/v1/product/product-list/${page}`
    );
    setProducts(data.products);
    setLoading(false);
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
    getAllProducts();
  }, []);

  /* ================= LOAD MORE ================= */

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  const loadMore = async () => {
    setLoading(true);
    const { data } = await axios.get(
      `http://localhost:4900/api/v1/product/product-list/${page}`
    );
    setProducts([...products, ...data.products]);
    setLoading(false);
  };

  /* ================= FILTER ================= */

  const handleFilter = (value, id) => {
    let all = [...checked];
    value ? all.push(id) : (all = all.filter((c) => c !== id));
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length && !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  const filterProduct = async () => {
    const { data } = await axios.post(
      "http://localhost:4900/api/v1/product/product-filters",
      { checked, radio }
    );
    setProducts(data.products);
  };

  /* ================= WISHLIST ================= */

  const toggleWishlist = (product) => {
    const exists = cart.some((c) => c._id === product._id);

    if (exists) {
      const updated = cart.filter((c) => c._id !== product._id);
      setCart(updated);
      localStorage.setItem("cart", JSON.stringify(updated));
      toast.success("Removed from wishlist");
    } else {
      const updated = [...cart, product];
      setCart(updated);
      localStorage.setItem("cart", JSON.stringify(updated));
      toast.success("Added to wishlist");
    }
  };

  return (
    <Layout title="Explore • The Reading Room">
      <div
        className="container-fluid py-4"
        style={{ backgroundColor: "#F8FAFC" }}
      >
        <div className="container">
          <div className="row">
            {/* ================= FILTERS ================= */}
            <div className="col-lg-3 mb-4">
              <div
                className="card border-0 rounded-4"
                style={{
                  boxShadow: "0 8px 24px rgba(15,23,42,0.06)",
                }}
              >
                <div className="card-body p-3">
                  <h6 className="fw-bold mb-3 text-primary">Filters</h6>

                  <p className="fw-semibold mb-2">Category</p>
                  {categories.map((c) => (
                    <div key={`${c._id}-${c.name}`} className="mb-1">
                      <Checkbox
                        onChange={(e) => handleFilter(e.target.checked, c._id)}
                      >
                        {c.name}
                      </Checkbox>
                    </div>
                  ))}

                  <hr />

                  <p className="fw-semibold mb-2">Price</p>
                  <Radio.Group
                    className="d-flex flex-column gap-1"
                    onChange={(e) => setRadio(e.target.value)}
                  >
                    {Prices.map((p) => (
                      <Radio key={`${p._id}-${p.name}`} value={p.array}>
                        {p.name}
                      </Radio>
                    ))}
                  </Radio.Group>

                  <button
                    className="btn w-100 mt-3 text-white rounded-pill"
                    style={{
                      background: "linear-gradient(135deg,#1E40AF,#2563EB)",
                    }}
                    onClick={() => window.location.reload()}
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
            </div>

            {/* ================= PRODUCTS ================= */}
            <div className="col-lg-9">
              <div className="row g-4">
                {loading
                  ? [...Array(8)].map((_, i) => (
                      <div className="col-md-6 col-xl-3" key={i}>
                        <div className="card border-0 rounded-4 p-3">
                          <Skeleton.Image
                            style={{ width: "100%", height: 140 }}
                          />
                          <Skeleton active paragraph={{ rows: 2 }} />
                        </div>
                      </div>
                    ))
                  : products.map((p) => {
                      const liked = cart.some((c) => c._id === p._id);

                      return (
                        <div
                          className="col-md-6 col-xl-3"
                          key={`${p._id}-${p.name}`}
                        >
                          <div
                            className="card h-100 border-0 rounded-4 product-card"
                            style={{
                              boxShadow: "0 10px 30px rgba(15,23,42,0.08)",
                              transition: "all 0.25s ease",
                            }}
                          >
                            <img
                              src={`http://localhost:4900/api/v1/product/product-photo/${p._id}`}
                              className="card-img-top rounded-top-4"
                              alt={p.name}
                              style={{
                                height: "140px",
                                objectFit: "cover",
                              }}
                            />

                            <div className="card-body d-flex flex-column p-3">
                              <h6 className="fw-semibold mb-1">{p.name}</h6>

                              <p className="text-muted small mb-2">
                                {p.description.substring(0, 40)}...
                              </p>

                              <div className="mb-1">
                                <AiFillStar color="#FACC15" />
                                <AiFillStar color="#FACC15" />
                                <AiFillStar color="#FACC15" />
                                <AiFillStar color="#FACC15" />
                                <AiOutlineStar color="#FACC15" />
                              </div>

                              <h6 className="fw-bold text-primary mb-2">
                                {p.price.toLocaleString("en-US", {
                                  style: "currency",
                                  currency: "USD",
                                })}
                              </h6>

                              <div className="d-flex justify-content-between align-items-center mt-auto">
                                <button
                                  className="btn btn-sm text-white px-3 py-1 rounded-pill"
                                  style={{
                                    background:
                                      "linear-gradient(135deg,#1E40AF,#2563EB)",
                                  }}
                                  onClick={() => navigate(`/product/${p.slug}`)}
                                >
                                  Details
                                </button>

                                <AiFillHeart
                                  size={22}
                                  style={{
                                    cursor: "pointer",
                                    color: liked ? "#EF4444" : "#83ade4ff",
                                  }}
                                  onClick={() => toggleWishlist(p)}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
              </div>

              {/* ================= LOAD MORE ================= */}
              {products.length < total && !loading && (
                <div className="text-center mt-4">
                  <button
                    className="btn btn-outline-primary px-4 rounded-pill"
                    onClick={() => setPage(page + 1)}
                  >
                    Load More <AiOutlineReload />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Hover animation */}
      <style>
        {`
          .product-card:hover {
            transform: translateY(-6px);
            box-shadow: 0 20px 40px rgba(15,23,42,0.15);
          }
        `}
      </style>
    </Layout>
  );
};

export default HomePage;
