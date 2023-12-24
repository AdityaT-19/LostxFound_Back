import router from "./selectqueries";
import { Router } from "express";

const locRouter = Router({ mergeParams: true });
locRouter.use("/locations", router);

export default locRouter;
