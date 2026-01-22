import request from "supertest";
import { describe, it, expect } from "vitest";
import { app } from "../src/app";

describe("GET /api/health", () => {
  it("returns 200 when API is up", async () => {
    const res = await request(app).get("/api/health");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
