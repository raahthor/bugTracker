import { describe, test, expect } from "vitest";
import request from "supertest";
import { app } from "../src/app";

describe("POST /api/login", () => {
  test("returns 400 on incorrect password", async () => {
    const res = await request(app).post("/api/login").send({
      username: "demouser",
      password: "123password",
    });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });
});
