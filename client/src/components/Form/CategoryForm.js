import React from "react";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <form onSubmit={handleSubmit}>
      {/* Input */}
      <div className="mb-3">
        <label className="form-label fw-semibold" style={{ color: "#0F172A" }}>
          Category Name
        </label>

        <input
          type="text"
          className="form-control"
          placeholder="Enter new category"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
          style={{
            borderRadius: "8px",
            borderColor: "#CBD5E1",
            padding: "10px 12px",
          }}
        />
        <small style={{ color: "#64748B" }}>
          Use clear and short category names.
        </small>
      </div>

      {/* Button */}
      <button
        type="submit"
        className="btn fw-semibold px-4"
        style={{
          backgroundColor: "#1E40AF",
          color: "#FFFFFF",
          borderRadius: "8px",
        }}
      >
        Save Category
      </button>
    </form>
  );
};

export default CategoryForm;
