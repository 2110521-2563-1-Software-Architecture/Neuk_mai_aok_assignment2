const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 3000;
const swaggerUi = require('swagger-ui-express');
const openApiDocumentation = require('./openAPI');

var books = [
  { id: 123, title: "A Tale of Two Cities", author: "Charles Dickens" },
];

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocumentation));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World, from express");
});

app.post("/insert", (req, res) => {
  const book = req.body;
  console.log(book);
  books.push(book);
  res.send("Book is added to the database");
});

app.get("/books", (req, res) => {
  res.json(books);
});


app.get("/book/:id", (req, res) => {
  let target;
  const id = parseInt(req.params.id);
  for (var i = 0; i < books.length; i++) {
    if (books[i].id == id) {
      target = books[i];
    }
  }
  res.json(target);
});

app.delete("/delete/:id", (req, res) => {
  const id = parseInt(req.params.id);

  for (var i = 0; i < books.length; i++) {
    if (books[i].id == id) {
      books.splice(i, 1);
      break;
    }
  }
  res.send("Book is deleted");
});


server = app.listen(port, () => {
  console.log(`Hello world app listening on port ${port}!`);

});

var io = require("socket.io")(server);

io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on('insert',(book) => {
        io.sockets.emit('notify',book)
    })
  });