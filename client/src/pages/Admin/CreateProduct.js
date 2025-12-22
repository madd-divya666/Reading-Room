import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState("");
  const [content1, setContent1] = useState("");
  const [content2, setContent2] = useState("");

  // GET CATEGORIES (UNCHANGED)
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) setCategories(data.category);
    } catch (error) {
      toast.error("Failed to load categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // CREATE PRODUCT (UNCHANGED)
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("photo", photo);
      productData.append("category", category);
      productData.append("content1", content1);
      productData.append("content2", content2);

      const { data } = await axios.post(
        "/api/v1/product/create-product",
        productData
      );

      if (data?.success) {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Create Course • The Reading Room">
      <div className="container-fluid py-5">
        <div className="container">
          <div className="row g-4">
            {/* SIDEBAR */}
            <div className="col-lg-3">
              <div className="bg-white rounded-4 shadow-sm p-3">
                <AdminMenu />
              </div>
            </div>

            {/* MAIN FORM */}
            <div className="col-lg-9">
              <div className="bg-white rounded-4 shadow-sm p-4 p-md-5">
                <h4 className="fw-bold mb-4" style={{ color: "#1E40AF" }}>
                  Create Course
                </h4>

                {/* CATEGORY */}
                <div className="mb-3">
                  <label className="fw-semibold mb-1">Category</label>
                  <Select
                    bordered={false}
                    placeholder="Select a category"
                    size="large"
                    showSearch
                    className="form-select"
                    onChange={(value) => setCategory(value)}
                  >
                    {categories.map((c) => (
                      <Option key={c._id} value={c._id}>
                        {c.name}
                      </Option>
                    ))}
                  </Select>
                </div>

                {/* PHOTO */}
                <div className="mb-3">
                  <label className="fw-semibold mb-1">Course Thumbnail</label>
                  <label className="btn btn-outline-secondary w-100">
                    {photo ? photo.name : "Upload Image"}
                    <input
                      type="file"
                      hidden
                      onChange={(e) => setPhoto(e.target.files[0])}
                    />
                  </label>
                </div>

                {photo && (
                  <div className="text-center mb-3">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="preview"
                      className="img-fluid rounded"
                      style={{ maxHeight: "250px" }}
                    />
                  </div>
                )}

                {/* CONTENT FILES */}
                <div className="mb-3">
                  <label className="fw-semibold mb-1">Notes (PDF)</label>
                  <label className="btn btn-outline-secondary w-100">
                    {content1 ? content1.name : "Upload Notes"}
                    <input
                      type="file"
                      hidden
                      onChange={(e) => setContent1(e.target.files[0])}
                    />
                  </label>
                </div>

                <div className="mb-3">
                  <label className="fw-semibold mb-1">Lectures</label>
                  <label className="btn btn-outline-secondary w-100">
                    {content2 ? content2.name : "Upload Lectures"}
                    <input
                      type="file"
                      hidden
                      onChange={(e) => setContent2(e.target.files[0])}
                    />
                  </label>
                </div>

                {/* DETAILS */}
                <div className="mb-3">
                  <label className="fw-semibold mb-1">Course Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="fw-semibold mb-1">Description</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label className="fw-semibold mb-1">Price</label>
                  <input
                    type="number"
                    className="form-control"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>

                {/* SUBMIT */}
                <button
                  className="btn text-white px-4"
                  style={{
                    background: "linear-gradient(135deg,#1E40AF,#2563EB)",
                  }}
                  onClick={handleCreate}
                >
                  Launch Course
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
