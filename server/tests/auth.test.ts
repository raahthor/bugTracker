import request from "supertest";
import { describe, test, expect } from "vitest";
import { app } from "../src/app";

describe("Test protected route", () => {
  test("rejects unauthenticated requests", async () => {
    const res = await request(app).get("/api/user-data");

    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });
});
