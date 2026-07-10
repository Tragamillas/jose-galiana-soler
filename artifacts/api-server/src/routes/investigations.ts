import { Router, type IRouter } from "express";
import { asc, eq } from "drizzle-orm";
import { db, investigationsTable } from "@workspace/db";
import {
  CreateInvestigationBody,
  UpdateInvestigationBody,
} from "@workspace/api-zod";
import { requireAdminToken } from "../middlewares/adminAuth";

const router: IRouter = Router();

router.get("/investigations", async (req, res): Promise<void> => {
  const rows = await db
    .select()
    .from(investigationsTable)
    .orderBy(asc(investigationsTable.sortOrder), asc(investigationsTable.id));
  req.log.info({ count: rows.length }, "Listed investigations");
  res.json(rows);
});

router.post("/investigations", requireAdminToken, async (req, res): Promise<void> => {
  const parsed = CreateInvestigationBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [row] = await db.insert(investigationsTable).values(parsed.data).returning();
  res.status(201).json(row);
});

router.patch("/investigations/:id", requireAdminToken, async (req, res): Promise<void> => {
  const rawId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(rawId, 10);
  if (Number.isNaN(id)) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  const parsed = UpdateInvestigationBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [row] = await db
    .update(investigationsTable)
    .set(parsed.data)
    .where(eq(investigationsTable.id, id))
    .returning();

  if (!row) {
    res.status(404).json({ error: "Investigation not found" });
    return;
  }

  res.json(row);
});

router.delete("/investigations/:id", requireAdminToken, async (req, res): Promise<void> => {
  const rawId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(rawId, 10);
  if (Number.isNaN(id)) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  const [row] = await db
    .delete(investigationsTable)
    .where(eq(investigationsTable.id, id))
    .returning();

  if (!row) {
    res.status(404).json({ error: "Investigation not found" });
    return;
  }

  res.sendStatus(204);
});

export default router;
