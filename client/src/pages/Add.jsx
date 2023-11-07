import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const URL = "http://localhost:3000/books";

const Add = () => {
  const navigate = useNavigate();
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
      await axios.post(URL, book);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  console.log(book);
  return (
    <div className="Form">
      <h1>Add New Book</h1>
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

      <button onClick={handleClick}>Add Book</button>
    </div>
  );
};

export default Add;
