// Address of the server is http://localhost:1234
// IP => 127.0.0.1:1234
const express = require("express");

const app = express();
const port = 1234;

let data = {
  users: ["James"],
};

//middleware

app.use(express.json());

// HTTP Verbs and Routes (or paths)
app.get("/", (request, response) => {
  response.send(`
    <body style="background:pink; color:blue;">
    <h1>Data:</h1>
        <p>${JSON.stringify(data)}</p>
        <a href="/dashboard">Dashboard</a>
    </body>
    
    `);
});

app.get("/dashboard", (request, response) => {
  response.send(`<body>
    <a href="/">Home</a>
    <h1>Dashboard</h1>
    </body>`);
});

// Website endpoints
// (Specifically for sending HTML, and they typically come when a user enters a url in a browser)

// CRUD-method - create-post, read-get, update-put, delete-delete

// API endpoints
app.get("/api/data", (request, response) => {
  response.status(599).send(data);
});

app.post("/api/data", (request, response) => {
  // someone wants to create a user for example when they click a sign up button
  const newEntry = request.body;
  console.log(newEntry);
  data.users.push(newEntry?.name);
  response.sendStatus(201);
});

app.delete("/api/data", (req, res) => {
  data.users.pop();
  console.log("Delted elm a the end the of the array");
  res.sendStatus(203);
});
// Sends out information
app.listen(port, () => {
  console.log(`Server has started on ${port}`);
});
