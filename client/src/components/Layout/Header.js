import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
import { BsFillJournalBookmarkFill } from "react-icons/bs";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();

  const handleLogout = () => {
    setAuth({ user: null, token: "" });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  const navLinkStyle = {
    color: "#FFFFFF",
    fontSize: "15px",
    fontWeight: 500,
    padding: "6px 12px",
  };

  return (
    <nav
      className="navbar navbar-expand-lg fixed-top"
      style={{
        background:
          "linear-gradient(135deg, #1E40AE 0%, #2563EB 50%, #60A5FA 100%)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      }}
    >
      <div className="container-fluid px-4">
        {/* TOGGLER */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarToggler"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* BRAND */}
        <Link
          to="/"
          className="navbar-brand d-flex align-items-center gap-2"
          style={{ color: "#fff", fontWeight: 700 }}
        >
          <BsFillJournalBookmarkFill size={22} />
          THE READING ROOM
        </Link>

        {/* NAV */}
        <div className="collapse navbar-collapse" id="navbarToggler">
          <ul className="navbar-nav ms-auto align-items-center gap-1">
            <SearchInput />

            <li className="nav-item">
              <NavLink to="/" className="nav-link" style={navLinkStyle}>
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to={`/dashboard/${
                  auth?.user?.role === 1 ? "admin" : "user"
                }/orders2`}
                className="nav-link"
                style={navLinkStyle}
              >
                My Learning
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/quiz" className="nav-link" style={navLinkStyle}>
                Live Quiz
              </NavLink>
            </li>

            {/* CATEGORIES */}
            <li className="nav-item dropdown">
              <span
                className="nav-link dropdown-toggle"
                style={{ ...navLinkStyle, cursor: "pointer" }}
                data-bs-toggle="dropdown"
              >
                Categories
              </span>
              <ul className="dropdown-menu shadow border-0 rounded-3">
                <li>
                  <Link className="dropdown-item" to="/categories">
                    All Categories
                  </Link>
                </li>
                {categories?.map((c) => (
                  <li key={`${c._id}-${c.name}`}>
                    <Link className="dropdown-item" to={`/category/${c.slug}`}>
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            {/* AUTH */}
            {!auth?.user ? (
              <>
                <li className="nav-item">
                  <NavLink
                    to="/register"
                    className="nav-link"
                    style={navLinkStyle}
                  >
                    Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/login"
                    className="nav-link"
                    style={navLinkStyle}
                  >
                    Login
                  </NavLink>
                </li>
              </>
            ) : (
              <li className="nav-item dropdown">
                <span
                  className="nav-link dropdown-toggle"
                  style={{ ...navLinkStyle, cursor: "pointer" }}
                  data-bs-toggle="dropdown"
                >
                  {auth.user.name}
                </span>
                <ul className="dropdown-menu shadow border-0 rounded-3">
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to={`/dashboard/${
                        auth.user.role === 1 ? "admin" : "user"
                      }`}
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={handleLogout}
                      className="dropdown-item"
                      to="/login"
                    >
                      Logout
                    </NavLink>
                  </li>
                </ul>
              </li>
            )}

            {/* WISHLIST */}
            <li className="nav-item">
              <NavLink
                to="/cart"
                className="nav-link d-flex align-items-center gap-1"
                style={navLinkStyle}
              >
                <Badge
                  count={cart?.length}
                  showZero
                  offset={[6, -4]}
                  style={{
                    backgroundColor: "#1E40AE",
                    fontSize: "12px",
                  }}
                >
                  <span style={{ fontSize: "15px", color: "#fff" }}>
                    Wishlist
                  </span>
                </Badge>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
