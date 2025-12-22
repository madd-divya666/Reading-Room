import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <aside
      className="rounded-3 shadow-sm p-3"
      style={{
        backgroundColor: "#FFFFFF",
        border: "1px solid #E5E7EB",
      }}
    >
      <h5 className="fw-bold text-center mb-3" style={{ color: "#0F172A" }}>
        Admin Panel
      </h5>

      <div className="list-group list-group-flush">
        <NavLink
          to="/dashboard/admin/create-category"
          className={({ isActive }) =>
            `list-group-item list-group-item-action rounded mb-2 ${
              isActive ? "text-white" : ""
            }`
          }
          style={({ isActive }) => ({
            backgroundColor: isActive ? "#1E40AF" : "transparent",
            border: "none",
            color: isActive ? "#FFFFFF" : "#334155",
            fontWeight: 500,
          })}
        >
          Create Category
        </NavLink>

        <NavLink
          to="/dashboard/admin/create-product"
          className={({ isActive }) =>
            `list-group-item list-group-item-action rounded mb-2 ${
              isActive ? "text-white" : ""
            }`
          }
          style={({ isActive }) => ({
            backgroundColor: isActive ? "#1E40AF" : "transparent",
            border: "none",
            color: isActive ? "#FFFFFF" : "#334155",
            fontWeight: 500,
          })}
        >
          Create Courses
        </NavLink>

        <NavLink
          to="/dashboard/admin/create-studymaterial"
          className={({ isActive }) =>
            `list-group-item list-group-item-action rounded mb-2 ${
              isActive ? "text-white" : ""
            }`
          }
          style={({ isActive }) => ({
            backgroundColor: isActive ? "#1E40AF" : "transparent",
            border: "none",
            color: isActive ? "#FFFFFF" : "#334155",
            fontWeight: 500,
          })}
        >
          Create Study Materials
        </NavLink>

        <NavLink
          to="/dashboard/admin/products"
          className={({ isActive }) =>
            `list-group-item list-group-item-action rounded mb-2 ${
              isActive ? "text-white" : ""
            }`
          }
          style={({ isActive }) => ({
            backgroundColor: isActive ? "#1E40AF" : "transparent",
            border: "none",
            color: isActive ? "#FFFFFF" : "#334155",
            fontWeight: 500,
          })}
        >
          Products
        </NavLink>

        <NavLink
          to="/dashboard/admin/orders"
          className={({ isActive }) =>
            `list-group-item list-group-item-action rounded mb-2 ${
              isActive ? "text-white" : ""
            }`
          }
          style={({ isActive }) => ({
            backgroundColor: isActive ? "#1E40AF" : "transparent",
            border: "none",
            color: isActive ? "#FFFFFF" : "#334155",
            fontWeight: 500,
          })}
        >
          Orders
        </NavLink>

        <NavLink
          to="/dashboard/admin/create-problem"
          className={({ isActive }) =>
            `list-group-item list-group-item-action rounded ${
              isActive ? "text-white" : ""
            }`
          }
          style={({ isActive }) => ({
            backgroundColor: isActive ? "#1E40AF" : "transparent",
            border: "none",
            color: isActive ? "#FFFFFF" : "#334155",
            fontWeight: 500,
          })}
        >
          Quiz Questions
        </NavLink>
      </div>
    </aside>
  );
};

export default AdminMenu;
