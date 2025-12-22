import React from "react";
import Layout from "./../components/Layout/Layout";
import { useSearch } from "../context/search";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [values] = useSearch();
  const navigate = useNavigate();

  return (
    <Layout title="Search Results">
      {/* PAGE BG */}
      <div
        className="container-fluid py-4"
        style={{ backgroundColor: "#F1F5F9", minHeight: "100vh" }}
      >
        <div className="container">
          {/* HEADER */}
          <div className="text-center mb-4">
            <h3 className="fw-bold" style={{ color: "#0F172A" }}>
              Search Results
            </h3>
            <p style={{ color: "#64748B" }}>
              {values?.results.length < 1
                ? "No products found"
                : `Found ${values.results.length} result(s)`}
            </p>
          </div>

          {/* RESULTS */}
          <div className="row g-4">
            {values?.results.map((p) => (
              <div className="col-sm-6 col-md-4 col-lg-3" key={p._id}>
                <div className="card border-0 shadow-sm h-100">
                  <img
                    src={`http://localhost:4900/api/v1/product/product-photo/${p._id}`}
                    alt={p.name}
                    className="card-img-top"
                    style={{
                      height: "160px",
                      objectFit: "cover",
                    }}
                  />

                  <div className="card-body d-flex flex-column">
                    <h6
                      className="fw-semibold mb-1"
                      style={{ color: "#0F172A" }}
                    >
                      {p.name}
                    </h6>

                    <p className="small mb-2" style={{ color: "#64748B" }}>
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

            {/* EMPTY STATE */}
            {values?.results.length === 0 && (
              <div className="col-12 text-center">
                <p style={{ color: "#64748B" }}>
                  Try searching with different keywords.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
