import request from "supertest";
import app from "../server";

describe("User Controller", () => {
  it("should login with existing user", async () => {
    const userInput = {
      email: "",
      password: "",
    };

    const response = await request(app).post("/auth/login").send(userInput);
    expect(response.status).toBe(200);
  });
});
