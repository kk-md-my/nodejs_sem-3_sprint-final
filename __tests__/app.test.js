const request = require("supertest");
const app = require("../app");

describe("Check whether app routes respond with the correct status codes", () => {
  describe("Check pages that do not require login", () => {
    it("should respond with a status code of '200'", async () => {
      const pathArr = ["/", "/home", "/signup", "/login"];

      for (const path of pathArr) {
        const res = await request(app).get(path);

        expect(res.status).toBe(200);
      }
    });

    it("should respond with a status code of '404'", async () => {
      const nonExistentPath = "/nonexistentpath";
      const res = await request(app).get(nonExistentPath);

      expect(res.status).toBe(404);
    });
  });

  describe("Check pages that require login", () => {
    describe("when the username or password is missing", () => {
      it("should respond with a status code of '401'", async () => {
        const pathArr = ["/search", "/results"];

        for (const path of pathArr) {
          const res = await request(app).get(path);

          expect(res.status).toBe(401);
        }
      });
    });

    describe("Check login form", () => {
      const loginPath = "/login";

      it("should respond with a status code of '400' for invalid credentials", async () => {
        const res = await request(app)
          .post(loginPath)
          .send(`username=invalidUsername&password=invalidPassword`);

        expect(res.status).toBe(400);
      });

      it("should respond with a status code of '303' and redirect to '/search' for valid credentials.", async () => {
        const username = "test_user";
        const password = "test_user";

        const res = await request(app)
          .post(loginPath)
          .send(`username=${username}&password=${password}`);

        expect(res.status).toBe(303);
        expect(res.headers.location).toBe("/search");
      });
    });

    describe("when the user is logged in", () => {
      it("should respond with a status code of '200' for the '/search' page", async () => {
        const res = await request(app).get("/search");

        expect(res.status).toBe(200);
      });

      it("should respond with a status code of '400' for the '/results' page", async () => {
        const res = await request(app).get("/results");

        expect(res.status).toBe(400);
      });
    });
  });
});
