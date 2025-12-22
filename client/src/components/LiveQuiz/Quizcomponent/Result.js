import React from "react";

const Result = ({ showResult, quizs, marks, startOver }) => {
  if (!showResult) return null;

  const totalMarks = quizs.length * 5;
  const passed = marks >= totalMarks / 2;

  return (
    <section
      style={{
        backgroundColor: "#F1F5F9",
        minHeight: "70vh",
      }}
      className="d-flex align-items-center"
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-7">
            <div className="card border-0 shadow-sm">
              <div className="card-body text-center p-4 p-md-5">
                {/* Status */}
                <h2
                  className="fw-bold mb-2"
                  style={{
                    color: passed ? "#16A34A" : "#DC2626",
                  }}
                >
                  {passed ? "Congratulations 🎉" : "Needs Improvement"}
                </h2>

                <p className="mb-4" style={{ color: "#64748B" }}>
                  {passed
                    ? "You have successfully passed the quiz."
                    : "Don’t worry, review the material and try again."}
                </p>

                {/* Score */}
                <div
                  className="rounded-3 p-4 mb-4"
                  style={{
                    backgroundColor: "#F8FAFC",
                    border: "1px solid #E5E7EB",
                  }}
                >
                  <h4 className="fw-semibold mb-1" style={{ color: "#0F172A" }}>
                    Your Score
                  </h4>
                  <h1
                    className="fw-bold mb-0"
                    style={{
                      color: passed ? "#16A34A" : "#DC2626",
                    }}
                  >
                    {marks} / {totalMarks}
                  </h1>
                </div>

                {/* Button */}
                <button
                  onClick={startOver}
                  className="btn px-4 py-2 fw-semibold text-white"
                  style={{ backgroundColor: "#1E40AF" }}
                >
                  Start Quiz Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Result;
