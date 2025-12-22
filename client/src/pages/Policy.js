import React from "react";
import Layout from "../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout title="Privacy Policy - The Reading Room">
      <div
        className="container py-5"
        style={{ backgroundColor: "#F8FAFC", minHeight: "70vh" }}
      >
        <div className="row justify-content-center">
          <div className="col-lg-9">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4 p-md-5">
                {/* Title */}
                <h2 className="fw-bold mb-3" style={{ color: "#0F172A" }}>
                  Privacy Policy
                </h2>

                <p style={{ color: "#64748B" }}>
                  Last updated: {new Date().getFullYear()}
                </p>

                <hr />

                {/* Content */}
                <section className="mb-4">
                  <h5 className="fw-semibold">1. Introduction</h5>
                  <p>
                    The Reading Room respects your privacy and is committed to
                    protecting your personal information. This policy explains
                    how we collect, use, and safeguard your data when you use
                    our platform.
                  </p>
                </section>

                <section className="mb-4">
                  <h5 className="fw-semibold">2. Information We Collect</h5>
                  <ul>
                    <li>Name, email address, and contact details</li>
                    <li>Login credentials and account activity</li>
                    <li>Course enrollments, quiz attempts, and progress</li>
                    <li>Payment information (processed securely)</li>
                  </ul>
                </section>

                <section className="mb-4">
                  <h5 className="fw-semibold">
                    3. How We Use Your Information
                  </h5>
                  <ul>
                    <li>To provide and improve learning services</li>
                    <li>To manage user accounts and authentication</li>
                    <li>To process payments and transactions</li>
                    <li>To communicate important updates</li>
                  </ul>
                </section>

                <section className="mb-4">
                  <h5 className="fw-semibold">4. Data Security</h5>
                  <p>
                    We implement appropriate security measures to protect your
                    data against unauthorized access, alteration, or disclosure.
                    However, no system is 100% secure.
                  </p>
                </section>

                <section className="mb-4">
                  <h5 className="fw-semibold">5. Third-Party Services</h5>
                  <p>
                    We may use trusted third-party services (such as payment
                    gateways) to support our platform. These services follow
                    their own privacy policies.
                  </p>
                </section>

                <section className="mb-4">
                  <h5 className="fw-semibold">6. Your Rights</h5>
                  <p>
                    You have the right to access, update, or delete your
                    personal data. You may also request account removal by
                    contacting us.
                  </p>
                </section>

                <section>
                  <h5 className="fw-semibold">7. Contact Us</h5>
                  <p>
                    If you have any questions regarding this Privacy Policy,
                    please contact us at:
                  </p>
                  <p className="fw-semibold">support@thereadingroom.com</p>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
