import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();

  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={product?.name}>
      {/* PAGE BG */}
      <div
        className="container-fluid py-4"
        style={{ backgroundColor: "#F1F5F9" }}
      >
        <div className="container">
          {/* PRODUCT DETAILS */}
          <div className="card border-0 shadow-sm mb-5">
            <div className="card-body p-4">
              <div className="row align-items-center g-4">
                {/* IMAGE */}
                <div className="col-md-6 text-center">
                  <img
                    src={`/api/v1/product/product-photo/${product._id}`}
                    alt={product.name}
                    className="img-fluid rounded"
                    style={{ maxHeight: "350px" }}
                  />
                </div>

                {/* INFO */}
                <div className="col-md-6">
                  <h3 className="fw-bold mb-2" style={{ color: "#0F172A" }}>
                    {product.name}
                  </h3>

                  <p style={{ color: "#64748B" }}>{product.description}</p>

                  <h4 className="fw-bold mb-3" style={{ color: "#1E40AF" }}>
                    {product?.price?.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </h4>

                  <p className="mb-3">
                    <span className="text-muted">Category:</span>{" "}
                    <strong>{product?.category?.name}</strong>
                  </p>

                  {/* ADD TO CART (FUNCTIONAL ONLY) */}
                  <button
                    className="btn text-white px-4"
                    style={{ backgroundColor: "#1E40AF" }}
                    onClick={() => {
                      const exists = cart.some((c) => c._id === product._id);

                      if (exists) {
                        toast("Already in cart");
                        return;
                      }

                      const updatedCart = [...cart, product];
                      setCart(updatedCart);
                      localStorage.setItem("cart", JSON.stringify(updatedCart));
                      toast.success("Added to cart");
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RELATED PRODUCTS */}
          <div className="mb-3">
            <h4 className="fw-bold mb-3">Related Materials</h4>

            {relatedProducts.length === 0 && (
              <p className="text-muted">No similar products found.</p>
            )}

            <div className="row g-4">
              {relatedProducts.map((p) => (
                <div className="col-sm-6 col-md-4 col-lg-3" key={p._id}>
                  <div className="card border-0 shadow-sm h-100">
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      alt={p.name}
                      className="card-img-top"
                      style={{
                        height: "160px",
                        objectFit: "cover",
                      }}
                    />

                    <div className="card-body d-flex flex-column">
                      <h6 className="fw-semibold mb-1">{p.name}</h6>

                      <p className="small text-muted">
                        {p.description.substring(0, 60)}...
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
            </div>
          </div>
          {/* END */}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
