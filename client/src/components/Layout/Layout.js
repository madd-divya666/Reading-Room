import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
      </Helmet>

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main
        style={{
          minHeight: "100vh",
          paddingTop: "80px", // ✅ fixes fixed navbar overlap
          backgroundColor: "#F8FAFC",
        }}
      >
        <Toaster position="top-right" />
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
};

Layout.defaultProps = {
  title: "The Reading Room",
  description:
    "The Reading Room is an online learning platform offering courses, quizzes, and study materials.",
  keywords: "online learning, quizzes, courses, study material, mern stack",
  author: "Divya Maddheshia",
};

export default Layout;
