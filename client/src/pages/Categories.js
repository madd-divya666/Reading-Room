import React from "react";
import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import Layout from "../components/Layout/Layout";

const Categories = () => {
  const categories = useCategory();

  return (
    <Layout title="All Categories">
      {/* PAGE BACKGROUND */}
      <div
        className="container-fluid py-4"
        style={{ backgroundColor: "#F1F5F9", minHeight: "100vh" }}
      >
        <div className="container">
          {/* HEADER */}
          <div className="mb-4 text-center">
            <h3 className="fw-bold" style={{ color: "#0F172A" }}>
              Browse Categories
            </h3>
            <p style={{ color: "#64748B" }}>
              Explore courses and materials by subject
            </p>
          </div>

          {/* CATEGORY GRID */}
          <div className="row g-4">
            {categories?.map((c) => (
              <div className="col-sm-6 col-md-4" key={c._id}>
                <Link
                  to={`/category/${c.slug}`}
                  className="text-decoration-none"
                >
                  <div
                    className="card border-0 shadow-sm h-100"
                    style={{
                      backgroundColor: "#FFFFFF",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#EFF6FF")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "#FFFFFF")
                    }
                  >
                    <div className="card-body text-center d-flex align-items-center justify-content-center">
                      <h5
                        className="fw-semibold mb-0"
                        style={{ color: "#1E40AF" }}
                      >
                        {c.name}
                      </h5>
                    </div>
                  </div>
                </Link>
              </div>
            ))}

            {/* EMPTY STATE */}
            {categories?.length === 0 && (
              <div className="col-12 text-center">
                <p style={{ color: "#64748B" }}>
                  No categories available at the moment.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
