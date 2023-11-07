import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";

const URL = "http://localhost:3000/books/";

const Update = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const bookId = location.pathname.split("/")[2];

  const [book, setBook] = useState({
    title: "",
    description: "",
    price: null,
    cover: "",
  });

  const handlechange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put(URL + bookId, book);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  console.log(book);
  return (
    <div className="Form">
      <h1>Update Book Details </h1>
      <input
        type="text"
        placeholder="title"
        onChange={handlechange}
        name="title"
      />
      <input
        type="text"
        placeholder="description"
        onChange={handlechange}
        name="description"
      />
      <input
        type="number"
        placeholder="price"
        onChange={handlechange}
        name="price"
      />
      <input
        type="text"
        placeholder="cover"
        onChange={handlechange}
        name="cover"
      />

      <button onClick={handleClick}>Update</button>
    </div>
  );
};

export default Update;
