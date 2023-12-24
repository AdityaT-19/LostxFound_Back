import { Router } from "express";
import { getLocationFromPLL } from "../locations/selectqueries";
import { getAllQuery, getOneQuery } from "../utils";
import { lost_item } from "./model";

const queryLostItemsTemplate = `SELECT
uid,
sname,
lid,
lname,
ldescription,
liimage,
ldate
FROM lost_item
NATURAL JOIN users
WHERE `;
async function getLostItemsByUser(uid: string): Promise<lost_item[]> {
  const queryLostItems = queryLostItemsTemplate + "uid = ?;";
  let rows = await getAllQuery<lost_item>(queryLostItems, [uid]);
  rows = await Promise.all(
    rows.map(async (row) => {
      let location = await getLocationFromPLL(row.lid!);
      return { ...row, location };
    })
  );
  //console.log((rows as lost_item[]) );
  return rows as lost_item[];
}

async function getAllLostItems(univid: number): Promise<lost_item[]> {
  const queryLostItems = `SELECT
    uid,
    sname,
    lid,
    lname,
    ldescription,
    liimage,
    ldate
FROM
    lost_item
    NATURAL JOIN users
WHERE
    univid = ? AND
    lID NOT IN (
        SELECT
            lid
        FROM
            resolved
    );`;
  let rows = await getAllQuery<lost_item>(queryLostItems, [univid]);
  //console.log(JSON.stringify(rows));

  rows = await Promise.all(
    rows.map(async (row) => {
      let location = await getLocationFromPLL(row.lid!);
      return { ...row, location };
    })
  );
  //console.log(JSON.stringify(rows) );
  return rows as lost_item[];
}

async function getRecent5LostItems(univid: number): Promise<lost_item[]> {
  const queryLostItems =
    queryLostItemsTemplate +
    `univid = ? 
  AND lid NOT IN (SELECT lid FROM resolved)
  ORDER BY ldate DESC LIMIT 5;`;
  let rows = await getAllQuery<lost_item>(queryLostItems, [univid]);

  rows = await Promise.all(
    rows.map(async (row) => {
      let location = await getLocationFromPLL(row.lid!);
      return { ...row, location };
    })
  );
  //console.log(JSON.stringify(rows) );
  return rows as lost_item[];
}
export async function getLostItemByID(lid: number): Promise<lost_item> {
  const queryLostItem = queryLostItemsTemplate + "lid = ?;";
  let row = await getOneQuery<lost_item>(queryLostItem, [lid]);
  let location = await getLocationFromPLL(row.lid!);
  row = { ...row, location };
  //console.log((row as lost_item) );
  return row as lost_item;
}

const router = Router({ mergeParams: true });

router.get("/", async (req, res) => {
  //@ts-ignore
  const univid = parseInt(req.params.univid);

  const lostitems = await getAllLostItems(univid);
  res.send(lostitems);
});

router.get("/recent", async (req, res) => {
  //@ts-ignore
  const univid = parseInt(req.params.univid);
  const lostitems = await getRecent5LostItems(univid);
  res.send(lostitems);
});

router.get("/:lid", async (req, res) => {
  const lid = parseInt(req.params.lid);
  const lostitem = await getLostItemByID(lid);
  res.send(lostitem);
});

router.get("/user/:uid", async (req, res) => {
  const uid = req.params.uid as string;
  const lostitems = await getLostItemsByUser(uid);
  res.send(lostitems);
});

export default router;
