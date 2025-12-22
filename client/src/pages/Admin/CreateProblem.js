import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";

const CreateProblem = () => {
  const [options, setOptions] = useState([]);
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [statement, setStatement] = useState("");
  const [answer, setAnswer] = useState("");

  // CREATE PROBLEM (LOGIC UNCHANGED)
  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("statement", statement);
      productData.append("answer", answer);
      productData.append("options", options);

      const { data } = await axios.post(
        "http://localhost:4900/api/v1/product/create-problem",
        productData
      );

      if (data?.success) {
        toast.success("Problem Created Successfully");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Create Quiz Problem • The Reading Room">
      <div className="container-fluid py-5">
        <div className="container">
          <div className="row g-4">
            {/* SIDEBAR */}
            <div className="col-lg-3">
              <div className="bg-white rounded-4 shadow-sm p-3">
                <AdminMenu />
              </div>
            </div>

            {/* MAIN CONTENT */}
            <div className="col-lg-9">
              <div className="bg-white rounded-4 shadow-sm p-4 p-md-5">
                <h4 className="fw-bold mb-4" style={{ color: "#1E40AF" }}>
                  Create Quiz Problem
                </h4>

                {/* QUESTION */}
                <div className="mb-3">
                  <label className="fw-semibold mb-1">Question Statement</label>
                  <input
                    type="text"
                    value={statement}
                    placeholder="Write the question"
                    className="form-control"
                    onChange={(e) => setStatement(e.target.value)}
                  />
                </div>

                {/* OPTIONS */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="fw-semibold mb-1">Option 1</label>
                    <textarea
                      className="form-control"
                      value={option1}
                      onChange={(e) => setOption1(e.target.value)}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="fw-semibold mb-1">Option 2</label>
                    <textarea
                      className="form-control"
                      value={option2}
                      onChange={(e) => setOption2(e.target.value)}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="fw-semibold mb-1">Option 3</label>
                    <textarea
                      className="form-control"
                      value={option3}
                      onChange={(e) => setOption3(e.target.value)}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="fw-semibold mb-1">Option 4</label>
                    <textarea
                      className="form-control"
                      value={option4}
                      onChange={(e) => setOption4(e.target.value)}
                    />
                  </div>
                </div>

                {/* ANSWER */}
                <div className="mb-4">
                  <label className="fw-semibold mb-1">Correct Answer</label>
                  <input
                    type="text"
                    value={answer}
                    placeholder="Write correct answer"
                    className="form-control"
                    onChange={(e) => {
                      setAnswer(e.target.value);
                      setOptions([option1, option2, option3, option4]);
                    }}
                  />
                </div>

                {/* BUTTON */}
                <button
                  className="btn text-white px-4"
                  style={{
                    background: "linear-gradient(135deg,#1E40AF,#2563EB)",
                  }}
                  onClick={handleCreate}
                >
                  Launch Problem
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProblem;
