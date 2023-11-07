import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../index.css";

const URL = "http://localhost:3000/books/";

const Books = () => {
  const [books, setBooks] = useState([]);

  const handledelete = async (id) => {
    try {
      await axios.delete(URL + id);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get(URL);
        const main = await res.data;
        setBooks(main);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllBooks();
  }, []);

  return (
    <div className="container">
      <div className="books">
        {books.map((item) => (
          <div className="book" key={item.id}>
            {item.cover && <img src={item.cover} alt={item.title} />}
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <span>{item.price}</span>
            <button className="update"><Link to={`/update/${item.id}`}>Update</Link></button>
            <button className="delete" onClick={() => handledelete(item.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>

      <button>
        <Link to="/add">Add Book</Link>
      </button>
    </div>
  );
};

export default Books;
