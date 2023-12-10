import express from "express";
import {
  getUser,
  getAllLocations,
  getAllLostItems,
  getFoundItemByID,
  getFoundItemsByLostItems,
  getFoundItemsByUser,
  getLostItemByID,
  getLostItemsByUser,
} from "./selectqueries";
import { addFoundItem, addLostItem } from "./insertqueries";
import { error } from "console";
import { found_itemIns, lost_itemIns } from "./model";

const app = express();
const port = 3000;
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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
