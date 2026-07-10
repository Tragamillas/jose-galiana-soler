import { Router, type IRouter } from "express";
import { asc, eq } from "drizzle-orm";
import { db, resourcesTable } from "@workspace/db";
import { CreateResourceBody, UpdateResourceBody } from "@workspace/api-zod";
import { requireAdminToken } from "../middlewares/adminAuth";

const router: IRouter = Router();

router.get("/resources", async (req, res): Promise<void> => {
  const rows = await db
    .select()
    .from(resourcesTable)
    .orderBy(asc(resourcesTable.sortOrder), asc(resourcesTable.id));
  req.log.info({ count: rows.length }, "Listed resources");
  res.json(rows);
});

router.post("/resources", requireAdminToken, async (req, res): Promise<void> => {
  const parsed = CreateResourceBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [row] = await db.insert(resourcesTable).values(parsed.data).returning();
  res.status(201).json(row);
});

router.patch("/resources/:id", requireAdminToken, async (req, res): Promise<void> => {
  const rawId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(rawId, 10);
  if (Number.isNaN(id)) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  const parsed = UpdateResourceBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [row] = await db
    .update(resourcesTable)
    .set(parsed.data)
    .where(eq(resourcesTable.id, id))
    .returning();

  if (!row) {
    res.status(404).json({ error: "Resource not found" });
    return;
  }

  res.json(row);
});

router.delete("/resources/:id", requireAdminToken, async (req, res): Promise<void> => {
  const rawId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(rawId, 10);
  if (Number.isNaN(id)) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  const [row] = await db
    .delete(resourcesTable)
    .where(eq(resourcesTable.id, id))
    .returning();

  if (!row) {
    res.status(404).json({ error: "Resource not found" });
    return;
  }

  res.sendStatus(204);
});

export default router;
