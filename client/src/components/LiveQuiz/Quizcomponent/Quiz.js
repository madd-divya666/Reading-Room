import React from "react";

const Quiz = ({
  showQuiz,
  question,
  quizs,
  checkAnswer,
  correctAnswer,
  selectedAnswer,
  questionIndex,
  nextQuestion,
  showTheResult,
}) => {
  if (!showQuiz) return null;

  return (
    <section
      className="d-flex align-items-center"
      style={{
        backgroundColor: "#F1F5F9",
        minHeight: "75vh",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-9 col-xl-8">
            <div className="card border-0 shadow rounded-4">
              <div className="card-body p-4 p-md-5">
                {/* HEADER */}
                <div className="d-flex justify-content-between align-items-start mb-4">
                  <h5
                    className="fw-semibold"
                    style={{
                      color: "#0F172A",
                      lineHeight: "1.6",
                    }}
                  >
                    {question?.statement}
                  </h5>

                  <span
                    className="badge rounded-pill px-3 py-2"
                    style={{
                      backgroundColor: "#1E40AF",
                      fontSize: "0.9rem",
                    }}
                  >
                    {questionIndex + 1} / {quizs.length}
                  </span>
                </div>

                {/* OPTIONS */}
                <div className="mb-4">
                  {question?.options?.map((item, index) => {
                    const isCorrect = correctAnswer === item;
                    const isWrong =
                      selectedAnswer === item && correctAnswer !== item;

                    return (
                      <button
                        key={index}
                        disabled={!!selectedAnswer}
                        onClick={(event) => checkAnswer(event, item)}
                        className={`btn w-100 text-start mb-3 px-4 py-3 rounded-3
                          ${
                            isCorrect
                              ? "bg-success text-white"
                              : isWrong
                              ? "bg-danger text-white"
                              : "bg-white"
                          }
                        `}
                        style={{
                          border: "1px solid #CBD5E1",
                          cursor: selectedAnswer ? "not-allowed" : "pointer",
                          transition: "all 0.2s ease",
                        }}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>

                {/* ACTION BUTTON */}
                <div className="mt-3">
                  {questionIndex + 1 !== quizs.length ? (
                    <button
                      className="btn w-100 py-2 fw-semibold text-white rounded-3"
                      style={{
                        background: "linear-gradient(135deg,#1E40AF,#2563EB)",
                      }}
                      onClick={nextQuestion}
                      disabled={!selectedAnswer}
                    >
                      Next Question
                    </button>
                  ) : (
                    <button
                      className="btn w-100 py-2 fw-semibold text-white rounded-3"
                      style={{
                        background: "linear-gradient(135deg,#1E40AF,#2563EB)",
                      }}
                      onClick={showTheResult}
                      disabled={!selectedAnswer}
                    >
                      Show Result
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* FOOT NOTE */}
            <p
              className="text-center mt-3"
              style={{ color: "#64748B", fontSize: "0.9rem" }}
            >
              Select one option to continue
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Quiz;
