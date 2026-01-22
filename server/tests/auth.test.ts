import request from "supertest";
import { describe, it, expect } from "vitest";
import { app } from "../src/app";

describe("Test protected route", () => {
  it("rejects unauthenticated requests", async () => {
    const res = await request(app).get("/api/user-data");

    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });
});
