import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
const app = express();
const PORT = process.env.PORT || 1234;

// Get the file path from the URL of the current module
const __filename = fileURLToPath(import.meta.url);
// Get the dir name form the file path
const __dirname = dirname(__filename);

//Middleware
//Serves the HTML from the /public dir and tells express to serve all files from the public folder as static.
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());

// Serving up the HTML file from the /public directory
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
