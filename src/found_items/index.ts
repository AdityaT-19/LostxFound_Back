import { Router } from "express";
import selectQueriesRouter from "./selectqueries";
import insertQueriesRouter from "./insertqueries";

const foundItemRouter = Router({ mergeParams: true });
foundItemRouter.use("/founditems", selectQueriesRouter);
foundItemRouter.use("/founditems", insertQueriesRouter);

export default foundItemRouter;
