import express from "express";
import dotenv from "dotenv";

import userRouter from "./user";
import locRouter from "./locations";
import foundItemRouter from "./found_items";
import lostItemRouter from "./lost_items";
import 'express-async-errors';

dotenv.config();

const app = express();
const port = process.env.EXPRESS_PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.use((err : any, req : any, res : any , next : any) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

try{
  app.use("/:univid", userRouter, locRouter, foundItemRouter, lostItemRouter,);
} catch (err) {
  console.error(err);
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
