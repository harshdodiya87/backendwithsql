import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

const port = 3000;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "harsh",
  database: "test",
});

app.use(express.json());
app.use(cors());

app.listen(port, (req, res) => {
  console.log("connected to backend");
});

app.get("/", (req, res) => {
  res.json("hello this is coming from backend");
});

app.post("/books", (req, res) => {
  const q =
    "INSERT INTO books (`title`, `description`,`price`, `cover`) VALUES (?)";
  const values = [
    req.body.title,
    req.body.description,
    req.body.price,
    req.body.cover,
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been created successfully");
  });
});

app.delete("/books/:id", (req, res) => {
  const bookID = req.params.id;
  const q = "DELETE FROM books WHERE id= ? ";

  db.query(q, [bookID], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been deleted successfully");
  });
});

app.put("/books/:id", (req, res) => {
  const bookID = req.params.id;
  const q = "UPDATE books SET `title` = ?, `description` = ?, `price` = ?, `cover` = ? WHERE id= ? ";

  const values =  [
    req.body.title,
    req.body.description,
    req.body.price,
    req.body.cover,
  ];
  db.query(q, [...values, bookID], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been updated   successfully");
  });
});


app.get("/books", (req, res) => {
  const q = "SELECT * FROM TEST.BOOKS";
  db.query(q, (error, data) => {
    if (error) return res.json(error);
    res.json(data);
  });
});
