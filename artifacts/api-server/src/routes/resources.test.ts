import { describe, it, expect, beforeEach, vi } from "vitest";
import request from "supertest";
import { createDbMocks } from "../test/mockDb";

const mocks = vi.hoisted(() => {
  return { current: undefined as unknown };
});

vi.mock("@workspace/db", async (importOriginal) => {
  const actual = await importOriginal<Record<string, unknown>>();
  return {
    ...actual,
    get db() {
      return (mocks.current as { db: unknown }).db;
    },
  };
});

const { db, state } = createDbMocks();
mocks.current = { db };

const ADMIN_TOKEN = process.env.ADMIN_API_TOKEN as string;

const validBody = {
  title: "Annual Report 2020",
  text: "A summary of the resource.",
  url: "https://example.com/report.pdf",
};

describe("resources routes", () => {
  let app: import("express").Express;

  beforeEach(async () => {
    vi.clearAllMocks();
    state.selectResult = [];
    state.insertResult = [];
    state.updateResult = [];
    state.deleteResult = [];
    vi.resetModules();
    const mod = await import("../app");
    app = mod.default;
  });

  describe("GET /api/resources", () => {
    it("returns data without requiring auth", async () => {
      state.selectResult = [
        { id: 1, ...validBody, category: "Archivo", tags: [], featured: false, sortOrder: 0 },
      ];

      const res = await request(app).get("/api/resources");

      expect(res.status).toBe(200);
      expect(res.body).toEqual(state.selectResult);
    });
  });

  describe("POST /api/resources", () => {
    it("rejects requests without a valid admin token", async () => {
      const res = await request(app).post("/api/resources").send(validBody);

      expect(res.status).toBe(401);
      expect(db.insert).not.toHaveBeenCalled();
    });

    it("rejects requests with an incorrect admin token", async () => {
      const res = await request(app)
        .post("/api/resources")
        .set("X-Admin-Token", "wrong-token")
        .send(validBody);

      expect(res.status).toBe(401);
      expect(db.insert).not.toHaveBeenCalled();
    });

    it("creates a record when the admin token is valid", async () => {
      const created = { id: 1, ...validBody, category: "Archivo", tags: [], featured: false, sortOrder: 0 };
      state.insertResult = [created];

      const res = await request(app)
        .post("/api/resources")
        .set("X-Admin-Token", ADMIN_TOKEN)
        .send(validBody);

      expect(res.status).toBe(201);
      expect(res.body).toEqual(created);
    });

    it("rejects an invalid body even with a valid admin token", async () => {
      const res = await request(app)
        .post("/api/resources")
        .set("X-Admin-Token", ADMIN_TOKEN)
        .send({ title: "" });

      expect(res.status).toBe(400);
      expect(db.insert).not.toHaveBeenCalled();
    });
  });

  describe("PATCH /api/resources/:id", () => {
    it("rejects requests without a valid admin token", async () => {
      const res = await request(app).patch("/api/resources/1").send({ title: "New" });

      expect(res.status).toBe(401);
    });

    it("returns 400 for a non-numeric id", async () => {
      const res = await request(app)
        .patch("/api/resources/not-a-number")
        .set("X-Admin-Token", ADMIN_TOKEN)
        .send({ title: "New" });

      expect(res.status).toBe(400);
      expect(db.update).not.toHaveBeenCalled();
    });

    it("returns 404 when the record does not exist", async () => {
      state.updateResult = [];

      const res = await request(app)
        .patch("/api/resources/999")
        .set("X-Admin-Token", ADMIN_TOKEN)
        .send({ title: "New" });

      expect(res.status).toBe(404);
    });

    it("updates and returns the record when found", async () => {
      const updated = { id: 1, ...validBody, title: "New", category: "Archivo", tags: [], featured: false, sortOrder: 0 };
      state.updateResult = [updated];

      const res = await request(app)
        .patch("/api/resources/1")
        .set("X-Admin-Token", ADMIN_TOKEN)
        .send({ title: "New" });

      expect(res.status).toBe(200);
      expect(res.body).toEqual(updated);
    });
  });

  describe("DELETE /api/resources/:id", () => {
    it("rejects requests without a valid admin token", async () => {
      const res = await request(app).delete("/api/resources/1");

      expect(res.status).toBe(401);
    });

    it("returns 400 for a non-numeric id", async () => {
      const res = await request(app)
        .delete("/api/resources/not-a-number")
        .set("X-Admin-Token", ADMIN_TOKEN);

      expect(res.status).toBe(400);
      expect(db.delete).not.toHaveBeenCalled();
    });

    it("returns 404 when the record does not exist", async () => {
      state.deleteResult = [];

      const res = await request(app)
        .delete("/api/resources/999")
        .set("X-Admin-Token", ADMIN_TOKEN);

      expect(res.status).toBe(404);
    });

    it("deletes the record when found", async () => {
      state.deleteResult = [{ id: 1 }];

      const res = await request(app)
        .delete("/api/resources/1")
        .set("X-Admin-Token", ADMIN_TOKEN);

      expect(res.status).toBe(204);
    });
  });
});
