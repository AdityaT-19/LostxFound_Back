import express from "express";
import { addFoundItem } from "./found_items/insertqueries";
import { found_itemIns } from "./found_items/model";
import {
  getFoundItemByID,
  getFoundItemsByLostItems,
  getFoundItemsByUser,
} from "./found_items/selectqueries";
import { getAllLocations } from "./locations/selectqueries";
import { addLostItem } from "./lost_items/insertqueries";
import { lost_itemIns } from "./lost_items/model";
import {
  getAllLostItems,
  getLostItemByID,
  getLostItemsByUser,
} from "./lost_items/selectqueries";
import { getUser, getUserEmail } from "./user/selectqueries";
import dotenv from "dotenv";
import { deleteLostItem } from "./lost_items/deletequery";

dotenv.config();

const app = express();
const port = process.env.EXPRESS_PORT;
app.use(express.json());

app.get("/:univid/user/:uid", async (req, res) => {
  const userId = req.params.uid as string;
  const user = await getUser(userId);
  res.send(user);
});

app.get("/:univid/locations", async (req, res) => {
  const univid = parseInt(req.params.univid);
  const locations = await getAllLocations(univid);
  res.send(locations);
});

app.get("/:univid/lostitems", async (req, res) => {
  const univid = parseInt(req.params.univid);
  const lostitems = await getAllLostItems(univid);
  res.send(lostitems);
});

app.get("/:univid/founditems/:fid", async (req, res) => {
  const id = parseInt(req.params.fid);
  const founditem = await getFoundItemByID(id);
  res.send(founditem);
});

app.get("/:univid/founditems/lostitems/:uid", async (req, res) => {
  const uid = req.params.uid as string;
  const founditems = await getFoundItemsByLostItems(uid);
  res.send(founditems);
});

app.get("/:univid/founditems/user/:uid", async (req, res) => {
  const uid = req.params.uid as string;
  const founditems = await getFoundItemsByUser(uid);
  res.send(founditems);
});

app.get("/:univid/lostitems/:lid", async (req, res) => {
  const lid = parseInt(req.params.lid);
  const lostitem = await getLostItemByID(lid);
  res.send(lostitem);
});

app.get("/:univid/lostitems/user/:uid", async (req, res) => {
  const uid = req.params.uid as string;
  const lostitems = await getLostItemsByUser(uid);
  res.send(lostitems);
});

app.post("/:univid/lostitems", async (req, res) => {
  const lostitem = req.body as lost_itemIns;
  const result = await addLostItem(lostitem);
  res.send(result);
});

app.post("/:univid/founditems", async (req, res) => {
  const founditem = req.body as found_itemIns;
  const result = await addFoundItem(founditem);
  res.send(result);
});

app.delete("/:univid/lostitems/:lid", async (req, res) => {
  const lid = parseInt(req.params.lid);
  const result = await deleteLostItem(lid);
  res.send(result);
});

app.get("/:uid", async (req, res) => {
  const uid = req.params.uid as string;
  const email = await getUserEmail(uid);
  res.send(email);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
