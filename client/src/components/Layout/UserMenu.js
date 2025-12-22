import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <aside
      className="rounded-3 shadow-sm p-3 mt-4"
      style={{
        backgroundColor: "#FFFFFF",
        border: "1px solid #E5E7EB",
      }}
    >
      {/* Heading */}
      <h5 className="fw-bold text-center mb-3" style={{ color: "#0F172A" }}>
        User Dashboard
      </h5>

      {/* Menu */}
      <div className="list-group list-group-flush">
        <NavLink
          to="/dashboard/user/profile"
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
          Profile
        </NavLink>

        <NavLink
          to="/dashboard/user/orders"
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
          Orders
        </NavLink>
      </div>
    </aside>
  );
};

export default UserMenu;
