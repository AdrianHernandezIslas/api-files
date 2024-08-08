import app from "./app";

async function main() {
  await app.listen(app.get("port"));
  console.log("Server running http://localhost:" + app.get("port"));
}

main();
