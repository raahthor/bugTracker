import request from "supertest";
import { describe, test, expect } from "vitest";
import { app } from "../src/app";

describe("GET /api/health", () => {
  test("returns 200 when API is up", async () => {
    const res = await request(app).get("/api/health");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
