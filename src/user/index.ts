import router from "./selectqueries";
import { Router } from "express";

const userRouter = Router();

userRouter.use("/user", router);

export default userRouter;