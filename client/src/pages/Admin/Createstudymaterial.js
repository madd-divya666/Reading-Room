import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const Createstudymaterial = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState("");
  const [content1, setContent1] = useState("");

  // get all category (UNCHANGED)
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4900/api/v1/category/get-category"
      );
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // create product (UNCHANGED)
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

      const { data } = await axios.post(
        "http://localhost:4900/api/v1/product/create-product",
        productData
      );

      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Dashboard - Create Study Material">
      <div className="container-fluid py-5">
        <div className="container">
          <div className="row g-4">
            {/* SIDEBAR */}
            <div className="col-lg-3">
              <div className="bg-white rounded-4 shadow-sm p-3">
                <AdminMenu />
              </div>
            </div>

            {/* FORM */}
            <div className="col-lg-9">
              <div className="bg-white rounded-4 shadow-sm p-4 p-md-5">
                <h4 className="fw-bold mb-4" style={{ color: "#1E40AF" }}>
                  Create Study Material
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
                    {categories?.map((c) => (
                      <Option key={c._id} value={c._id}>
                        {c.name}
                      </Option>
                    ))}
                  </Select>
                </div>

                {/* PHOTO */}
                <div className="mb-3">
                  <label className="fw-semibold mb-1">Thumbnail</label>
                  <label className="btn btn-outline-secondary w-100">
                    {photo ? photo.name : "Upload Photo"}
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

                {/* PDF */}
                <div className="mb-3">
                  <label className="fw-semibold mb-1">
                    Study Material (PDF)
                  </label>
                  <label className="btn btn-outline-secondary w-100">
                    {content1 ? content1.name : "Upload PDF"}
                    <input
                      type="file"
                      hidden
                      onChange={(e) => setContent1(e.target.files[0])}
                    />
                  </label>
                </div>

                {/* NAME */}
                <div className="mb-3">
                  <label className="fw-semibold mb-1">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                {/* DESCRIPTION */}
                <div className="mb-3">
                  <label className="fw-semibold mb-1">Description</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                {/* PRICE */}
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
                  LAUNCH
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Createstudymaterial;
