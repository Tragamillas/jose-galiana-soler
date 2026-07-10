import { boolean, integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const investigationsTable = pgTable("investigations", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  href: text("href").notNull(),
  period: text("period").notNull(),
  periodLabel: text("period_label").notNull(),
  title: text("title").notNull(),
  role: text("role").notNull(),
  text: text("text").notNull(),
  tags: text("tags").array().notNull().default([]),
  featured: boolean("featured").notNull().default(false),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const insertInvestigationSchema = createInsertSchema(investigationsTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type InsertInvestigation = z.infer<typeof insertInvestigationSchema>;
export type Investigation = typeof investigationsTable.$inferSelect;
