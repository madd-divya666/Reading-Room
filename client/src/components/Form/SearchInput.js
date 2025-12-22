import React from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BiSearch } from "react-icons/bi";

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!values.keyword?.trim()) return;

    try {
      const { data } = await axios.get(
        `http://localhost:4900/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="d-flex align-items-center"
      style={{
        backgroundColor: "#FFFFFF",
        border: "1px solid #CBD5E1",
        borderRadius: "999px",
        padding: "4px 10px",
      }}
    >
      <input
        type="search"
        placeholder="Search courses, materials..."
        value={values.keyword}
        onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        className="form-control border-0 shadow-none"
        style={{
          fontSize: "0.9rem",
          backgroundColor: "transparent",
        }}
      />

      <button
        type="submit"
        className="btn p-0 d-flex align-items-center justify-content-center"
        style={{
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          color: "#475569",
        }}
      >
        <BiSearch size={18} />
      </button>
    </form>
  );
};

export default SearchInput;
