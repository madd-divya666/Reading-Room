import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // total price
  const totalPrice = () => {
    let total = 0;
    cart?.forEach((item) => (total += item.price));
    return total.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  // remove item
  const removeCartItem = (pid) => {
    const updatedCart = cart.filter((item) => item._id !== pid);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // get payment token
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4900/api/v1/product/braintree/token"
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getToken();
  }, [auth?.token]);

  // handle payment
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      await axios.post(
        "http://localhost:4900/api/v1/product/braintree/payment",
        { nonce, cart }
      );
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders2");
      toast.success("Payment completed successfully");
    } catch (error) {
      setLoading(false);
      toast.error("Payment failed");
    }
  };

  return (
    <Layout title="Your Cart">
      {/* PAGE BG */}
      <div
        className="container-fluid py-4"
        style={{ backgroundColor: "#F1F5F9", minHeight: "100vh" }}
      >
        <div className="container">
          {/* HEADER */}
          <div className="mb-4 text-center">
            <h3 className="fw-bold">Shopping Cart</h3>
            <p className="text-muted">
              {cart.length
                ? `You have ${cart.length} item(s) in your cart`
                : "Your cart is empty"}
            </p>
          </div>

          <div className="row">
            {/* CART ITEMS */}
            <div className="col-md-7">
              {cart.length === 0 && (
                <div className="card border-0 shadow-sm p-4 text-center">
                  <p className="text-muted mb-0">
                    Add courses or materials to continue
                  </p>
                </div>
              )}

              {cart.map((p) => (
                <div key={p._id} className="card border-0 shadow-sm mb-3">
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col-md-3">
                        <img
                          src={`http://localhost:4900/api/v1/product/product-photo/${p._id}`}
                          alt={p.name}
                          className="img-fluid rounded"
                        />
                      </div>

                      <div className="col-md-6">
                        <h6 className="fw-semibold mb-1">{p.name}</h6>
                        <p className="text-muted small mb-1">{p.description}</p>
                        <p className="fw-semibold mb-0">₹ {p.price}</p>
                      </div>

                      <div className="col-md-3 text-md-end">
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => removeCartItem(p._id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* SUMMARY & PAYMENT */}
            <div className="col-md-5">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="fw-bold mb-3">Order Summary</h5>

                  <p className="d-flex justify-content-between">
                    <span>Total</span>
                    <span className="fw-semibold">{totalPrice()}</span>
                  </p>

                  <hr />

                  {!auth?.token && (
                    <button
                      className="btn btn-outline-primary w-100 mb-3"
                      onClick={() => navigate("/login", { state: "/cart" })}
                    >
                      Login to Checkout
                    </button>
                  )}

                  {clientToken && auth?.token && cart.length > 0 && (
                    <>
                      <DropIn
                        options={{
                          authorization: clientToken,
                          paypal: { flow: "vault" },
                        }}
                        onInstance={(instance) => setInstance(instance)}
                      />

                      <button
                        className="btn text-white w-100 mt-3"
                        style={{ backgroundColor: "#1E40AF" }}
                        onClick={handlePayment}
                        disabled={loading || !instance}
                      >
                        {loading ? "Processing..." : "Make Payment"}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
            {/* END */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
