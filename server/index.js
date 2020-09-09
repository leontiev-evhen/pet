import { createServer } from "http";
createServer((_, response) => {
  response.end("Hello NodeJS!");
}).listen(3000, "127.0.0.1", () => {
  console.log("The server has been started on 3000 port");
});
