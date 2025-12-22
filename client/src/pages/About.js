import React from "react";
import Layout from "./../components/Layout/Layout";

const About = () => {
  return (
    <Layout title="About Us - The Reading Room">
      {/* PAGE BACKGROUND */}
      <div
        className="container-fluid py-5"
        style={{ backgroundColor: "#F1F5F9" }}
      >
        <div className="container">
          <div className="row align-items-center g-5">
            {/* IMAGE */}
            <div className="col-md-6">
              <img
                src="/images/contact.png"
                alt="About The Reading Room"
                className="img-fluid rounded shadow-sm"
              />
            </div>

            {/* CONTENT */}
            <div className="col-md-6">
              <h2 className="fw-bold mb-3" style={{ color: "#0F172A" }}>
                About The Reading Room
              </h2>

              <p style={{ color: "#64748B" }}>
                The Reading Room is a modern e-learning platform designed to
                help students prepare effectively for competitive exams,
                academic assessments, and professional growth.
              </p>

              <p style={{ color: "#64748B" }}>
                We provide structured video lectures, detailed study materials,
                live quizzes, and performance tracking — all in one place. Our
                goal is to make learning accessible, organized, and
                result-oriented.
              </p>

              <p style={{ color: "#64748B" }}>
                Whether you are revising concepts, practicing mock tests, or
                accessing notes anytime, The Reading Room ensures a smooth and
                focused learning experience.
              </p>

              {/* HIGHLIGHTS */}
              <div className="row mt-4">
                <div className="col-sm-6 mb-3">
                  <div className="p-3 bg-white rounded shadow-sm">
                    <h5 className="fw-bold mb-1" style={{ color: "#1E40AF" }}>
                      Structured Learning
                    </h5>
                    <p className="mb-0" style={{ color: "#64748B" }}>
                      Organized courses and materials
                    </p>
                  </div>
                </div>

                <div className="col-sm-6 mb-3">
                  <div className="p-3 bg-white rounded shadow-sm">
                    <h5 className="fw-bold mb-1" style={{ color: "#1E40AF" }}>
                      Exam Focused
                    </h5>
                    <p className="mb-0" style={{ color: "#64748B" }}>
                      Practice quizzes & assessments
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* END CONTENT */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
