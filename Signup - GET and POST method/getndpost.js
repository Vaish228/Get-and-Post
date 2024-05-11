const http = require("http");
const url = require("url");
/* const fs = require("fs"); */ 

const server = http.createServer((req, res) => {
  const reqUrl = url.parse(req.url, true);

  if (reqUrl.pathname === "/login" && req.method === "GET") {
    const email = reqUrl.query.email;
    const password = reqUrl.query.password;

    console.log("email: ", email);
    console.log("password: ", password);

    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Account Created successfully!");
  } 
  else if (req.method === "POST" && req.url === "/login") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const formData = new URLSearchParams(body);
      const email = formData.get("email");
      const password = formData.get("password");

      console.log("Email:", email);
      console.log("Password:", password);

      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Account created successfully!");
    });
  } else {
    res.writeHead(400, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log("Server is running in port 5000");
});