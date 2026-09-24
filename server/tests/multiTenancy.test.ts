import { describe, expect, test } from "vitest";
import request from "supertest";
import { app } from "../src/app";
import { generateToken } from "../src/auth/jwt";

describe("GET /api/org-data/:handle", () => {
  test("return 403 on accesing other organizations", async () => {
    const token = generateToken({
      id: "sdf345ff-ef7f-7542-qwe5-c07cfbc6g8h6",
      email: "demouser@demo.email",
    });
    const res = await request(app)
      .get("/api/org-data/acme-in")
      .set("Cookie", `token=${token}`);
    expect(res.status).toBe(403);
  });
});
