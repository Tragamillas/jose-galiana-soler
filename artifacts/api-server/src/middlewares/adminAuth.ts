import type { NextFunction, Request, Response } from "express";

export function requireAdminToken(req: Request, res: Response, next: NextFunction): void {
  const expected = process.env.ADMIN_API_TOKEN;
  const provided = req.header("X-Admin-Token");

  if (!expected) {
    req.log.error("ADMIN_API_TOKEN is not configured on the server");
    res.status(500).json({ error: "Server misconfiguration: admin token not configured" });
    return;
  }

  if (!provided || provided !== expected) {
    res.status(401).json({ error: "Invalid or missing admin token" });
    return;
  }

  next();
}
