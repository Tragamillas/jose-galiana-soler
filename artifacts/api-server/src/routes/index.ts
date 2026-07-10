import { Router, type IRouter } from "express";
import healthRouter from "./health";
import investigationsRouter from "./investigations";
import resourcesRouter from "./resources";

const router: IRouter = Router();

router.use(healthRouter);
router.use(investigationsRouter);
router.use(resourcesRouter);

export default router;
