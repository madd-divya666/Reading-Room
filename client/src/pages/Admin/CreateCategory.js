import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal } from "antd";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  // CREATE
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/category/create-category", {
        name,
      });
      if (data?.success) {
        toast.success(`${name} created`);
        setName("");
        getAllCategory();
      } else toast.error(data.message);
    } catch {
      toast.error("Something went wrong");
    }
  };

  // GET ALL
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) setCategories(data.category);
    } catch {
      toast.error("Failed to load categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // UPDATE
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data?.success) {
        toast.success("Category updated");
        setVisible(false);
        setSelected(null);
        setUpdatedName("");
        getAllCategory();
      }
    } catch {
      toast.error("Update failed");
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/category/delete-category/${id}`
      );
      if (data?.success) {
        toast.success("Category deleted");
        getAllCategory();
      }
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <Layout title="Manage Categories • The Reading Room">
      <div className="container-fluid py-5">
        <div className="container">
          <div className="row g-4">
            {/* SIDEBAR */}
            <div className="col-lg-3">
              <div className="bg-white rounded-4 shadow-sm p-3">
                <AdminMenu />
              </div>
            </div>

            {/* MAIN */}
            <div className="col-lg-9">
              <div className="bg-white rounded-4 shadow-sm p-4">
                <h4 className="fw-bold mb-4" style={{ color: "#1E40AF" }}>
                  Manage Categories
                </h4>

                {/* CREATE FORM */}
                <div className="mb-4">
                  <CategoryForm
                    handleSubmit={handleSubmit}
                    value={name}
                    setValue={setName}
                  />
                </div>

                {/* TABLE */}
                <div className="table-responsive">
                  <table className="table align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>Name</th>
                        <th style={{ width: "200px" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.map((c) => (
                        <tr key={c._id}>
                          <td className="fw-semibold">{c.name}</td>
                          <td>
                            <button
                              className="btn btn-sm text-white me-2"
                              style={{
                                background:
                                  "linear-gradient(135deg,#1E40AF,#2563EB)",
                              }}
                              onClick={() => {
                                setVisible(true);
                                setSelected(c);
                                setUpdatedName(c.name);
                              }}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => handleDelete(c._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MODAL */}
        <Modal
          open={visible}
          onCancel={() => setVisible(false)}
          footer={null}
          title="Update Category"
        >
          <CategoryForm
            handleSubmit={handleUpdate}
            value={updatedName}
            setValue={setUpdatedName}
          />
        </Modal>
      </div>
    </Layout>
  );
};

export default CreateCategory;
