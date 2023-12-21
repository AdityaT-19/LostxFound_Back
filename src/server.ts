import express from "express";
import dotenv from "dotenv";

import userRouter from "./user";
import locRouter from "./locations";
import foundItemRouter from "./found_items";
import lostItemRouter from "./lost_items";

dotenv.config();

const app = express();
const port = process.env.EXPRESS_PORT;
app.use(express.json());


app.use("/:univid", userRouter);
app.use("/:univid", locRouter);

app.use("/:univid", foundItemRouter);

app.use("/:univid", lostItemRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
