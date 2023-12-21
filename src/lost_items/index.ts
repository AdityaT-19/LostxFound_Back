import { Router } from "express";
import deleteRouter from "./deletequery";
import insertRouter from "./insertqueries";
import selectRouter from "./selectqueries";
import updateRouter from "./updatequeries";

const lostItemRouter = Router();
lostItemRouter.use("/lostitems", deleteRouter);
lostItemRouter.use("/lostitems", insertRouter);
lostItemRouter.use("/lostitems", selectRouter);
lostItemRouter.use("/lostitems", updateRouter);

export default lostItemRouter;
