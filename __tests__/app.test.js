const request = require("supertest");
const app = require("../app");

describe("Check whether app routes respond with the correct status codes", () => {
  describe("Check pages that do not require login", () => {
    const pathArr = ["/", "/home", "/signup", "/login"];
    const nonExistentPath = "/nonexistentpath";

    it("should respond with a status code of '200'", async () => {
      for (const path of pathArr) {
        const res = await request(app).get(path);

        expect(res.status).toBe(200);
      }
    });

    it("should respond with a status code of '404'", async () => {
      const res = await request(app).get(nonExistentPath);

      expect(res.status).toBe(404);
    });
  });

  describe("Check pages that require login", () => {
    const pathArr = ["/search", "/results"];

    it("should respond with a status code of '401' when the username or password is missing", async () => {
      for (const path of pathArr) {
        const res = await request(app).get(path);

        expect(res.status).toBe(401);
      }
    });

    // should respond with a status code of '200' when the user is logged in
  });
});

describe("Check 'login' form", () => {
  const path = "/login";
  const username = "test";
  const password = "test";

  it("should respond with a status code of '303' and redirect to '/search' for valid credentials.", async () => {
    const res = await request(app)
      .post(path)
      .send(`username=${username}&password=${password}`);

    expect(res.status).toBe(303);
    expect(res.headers.location).toBe("/search");
  });

  it("should respond with a status code of '401' for invalid credentials", async () => {
    const res = await request(app)
      .post(path)
      .send(`username=invalidUsername&password=invalidPassword`);

    expect(res.status).toBe(401);
  });
});
