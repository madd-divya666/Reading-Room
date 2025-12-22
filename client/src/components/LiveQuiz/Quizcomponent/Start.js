import React from "react";

const Start = ({ startQuiz, showStart }) => {
  if (!showStart) return null;

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
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm">
              <div className="card-body text-center p-4 p-md-5">
                {/* Title */}
                <h1 className="fw-bold mb-3" style={{ color: "#0F172A" }}>
                  Quiz
                </h1>

                <p
                  className="mb-4"
                  style={{ color: "#64748B", fontSize: "1.05rem" }}
                >
                  Test your understanding and assess your knowledge. Read each
                  question carefully before answering.
                </p>

                {/* Instructions */}
                <div
                  className="text-start mx-auto mb-4"
                  style={{ maxWidth: "420px" }}
                >
                  <ul style={{ color: "#334155" }}>
                    <li>
                      Each question carries <strong>5 marks</strong>
                    </li>
                    <li>No negative marking</li>
                    <li>You must answer to proceed</li>
                    <li>Results will be shown at the end</li>
                  </ul>
                </div>

                {/* CTA */}
                <button
                  onClick={startQuiz}
                  className="btn px-4 py-2 fw-semibold text-white"
                  style={{
                    backgroundColor: "#1E40AF",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.12)",
                  }}
                >
                  Start Quiz
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Start;
