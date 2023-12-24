import router from "./selectqueries";
import { Router } from "express";

const userRouter = Router({ mergeParams: true});

userRouter.use("/user", router);

export default userRouter;