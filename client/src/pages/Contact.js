import React from "react";
import Layout from "./../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const Contact = () => {
  return (
    <Layout title="Contact Us - The Reading Room">
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
                alt="Contact The Reading Room"
                className="img-fluid rounded shadow-sm"
              />
            </div>

            {/* CONTENT */}
            <div className="col-md-6">
              <h2 className="fw-bold mb-3" style={{ color: "#0F172A" }}>
                Contact Us
              </h2>

              <p style={{ color: "#64748B" }}>
                Have questions about courses, study materials, or subscriptions?
                Our support team is here to help you.
              </p>

              {/* CONTACT CARDS */}
              <div className="mt-4">
                <div className="card border-0 shadow-sm mb-3">
                  <div className="card-body d-flex align-items-center gap-3">
                    <BiMailSend size={22} style={{ color: "#1E40AF" }} />
                    <span style={{ color: "#0F172A" }}>
                      support@thereadingroom.com
                    </span>
                  </div>
                </div>

                <div className="card border-0 shadow-sm mb-3">
                  <div className="card-body d-flex align-items-center gap-3">
                    <BiPhoneCall size={22} style={{ color: "#1E40AF" }} />
                    <span style={{ color: "#0F172A" }}>+91 01234 56789</span>
                  </div>
                </div>

                <div className="card border-0 shadow-sm">
                  <div className="card-body d-flex align-items-center gap-3">
                    <BiSupport size={22} style={{ color: "#1E40AF" }} />
                    <span style={{ color: "#0F172A" }}>
                      1800-000-000 (Toll Free)
                    </span>
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

export default Contact;
