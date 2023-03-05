const { app } = require("../src/server");

const request = require("supertest");

// to test the route of the server we pass the super test the app we created (exported) in the server (const app = express();)

// ****using this three line below you can skip request(app).get() in the test to ==>>>> request.get()****
// const { app } = require("../src/server");
// const supertest = require("supertest");
// const request = supertest(server.app);

describe("API server ", () => {
  test("getting data from home route />>> home route is working", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe("Hello World!");
  });
  test("getting data from /data route />>> /data route is working", async () => {
    const response = await request(app).get("/data");
    expect(typeof response.body).toBe("object");
  });
  test("handle not found request", async () => {
    const response = await request(app).get("/notExist");
    expect(response.statusCode).toBe(404);
  });
  test("handle server internal errors", async () => {
    const response = await request(app).get("/bad");
    expect(response.statusCode).toBe(500);
  });
});

describe("GET / home", () => {
  test("It should respond with hello world", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe("Hello World!");
  });
});
