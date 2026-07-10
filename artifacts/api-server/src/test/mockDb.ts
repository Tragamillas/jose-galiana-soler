import { vi } from "vitest";

/**
 * Shared drizzle-style chainable mock. Each terminal method resolves to a
 * configurable array so tests can simulate "found" vs "not found" rows
 * without touching a real database.
 */
export function createDbMocks() {
  const state = {
    selectResult: [] as unknown[],
    insertResult: [] as unknown[],
    updateResult: [] as unknown[],
    deleteResult: [] as unknown[],
  };

  const db = {
    select: vi.fn(() => ({
      from: vi.fn(() => ({
        orderBy: vi.fn(() => Promise.resolve(state.selectResult)),
      })),
    })),
    insert: vi.fn(() => ({
      values: vi.fn(() => ({
        returning: vi.fn(() => Promise.resolve(state.insertResult)),
      })),
    })),
    update: vi.fn(() => ({
      set: vi.fn(() => ({
        where: vi.fn(() => ({
          returning: vi.fn(() => Promise.resolve(state.updateResult)),
        })),
      })),
    })),
    delete: vi.fn(() => ({
      where: vi.fn(() => ({
        returning: vi.fn(() => Promise.resolve(state.deleteResult)),
      })),
    })),
  };

  return { db, state };
}
