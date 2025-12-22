import React, { useEffect, useState } from "react";
import Start from "./Quizcomponent/Start";
import Quiz from "./Quizcomponent/Quiz";
import Result from "./Quizcomponent/Result";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "../Layout/Layout";

function App2() {
  // Quiz State
  const [quizs, setQuizs] = useState([]);
  const [question, setQuesion] = useState({});
  const [questionIndex, setQuestionIndex] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [marks, setMarks] = useState(0);

  // UI Control
  const [showStart, setShowStart] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showResult, setShowResult] = useState(false);

  // Fetch Questions
  const getAllProblem = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4900/api/v1/product/get-problem"
      );
      setQuizs(data.problem);
    } catch (error) {
      console.error(error);
      toast.error("Unable to load quiz");
    }
  };

  useEffect(() => {
    getAllProblem();
  }, []);

  // Set Current Question
  useEffect(() => {
    if (quizs.length > questionIndex) {
      setQuesion(quizs[questionIndex]);
    }
  }, [quizs, questionIndex]);

  // Start Quiz
  const startQuiz = () => {
    setShowStart(false);
    setShowQuiz(true);
  };

  // Check Answer
  const checkAnswer = (event, selected) => {
    if (!selectedAnswer) {
      setCorrectAnswer(question.answer);
      setSelectedAnswer(selected);

      if (selected === question.answer) {
        event.target.classList.add("bg-success");
        setMarks(marks + 5);
      } else {
        event.target.classList.add("bg-danger");
      }
    }
  };

  // Next Question
  const nextQuestion = () => {
    setCorrectAnswer("");
    setSelectedAnswer("");
    document.querySelector("button.bg-danger")?.classList.remove("bg-danger");
    document.querySelector("button.bg-success")?.classList.remove("bg-success");
    setQuestionIndex(questionIndex + 1);
  };

  // Show Result
  const showTheResult = () => {
    setShowResult(true);
    setShowStart(false);
    setShowQuiz(false);
  };

  // Restart Quiz
  const startOver = () => {
    setShowStart(false);
    setShowResult(false);
    setShowQuiz(true);
    setCorrectAnswer("");
    setSelectedAnswer("");
    setQuestionIndex(0);
    setMarks(0);
    document.querySelector("button.bg-danger")?.classList.remove("bg-danger");
    document.querySelector("button.bg-success")?.classList.remove("bg-success");
  };

  return (
    <Layout title="Live Quiz">
      <div
        className="container-fluid py-5"
        style={{
          minHeight: "100vh",
          backgroundColor: "#F1F5F9",
        }}
      >
        <div className="container d-flex justify-content-center">
          <div
            className="card border-0 shadow-sm w-100"
            style={{ maxWidth: "900px" }}
          >
            <div className="card-body p-4 p-md-5">
              {/* Start */}
              <Start startQuiz={startQuiz} showStart={showStart} />

              {/* Quiz */}
              <Quiz
                showQuiz={showQuiz}
                question={question}
                quizs={quizs}
                checkAnswer={checkAnswer}
                correctAnswer={correctAnswer}
                selectedAnswer={selectedAnswer}
                questionIndex={questionIndex}
                nextQuestion={nextQuestion}
                showTheResult={showTheResult}
              />

              {/* Result */}
              <Result
                showResult={showResult}
                quizs={quizs}
                marks={marks}
                startOver={startOver}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default App2;
