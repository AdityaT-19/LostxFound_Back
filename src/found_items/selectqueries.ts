import { Camids, Location } from "../locations/model";
import { getAllQuery, getOneQuery } from "../utils";
import { found_item, found_itemTemp } from "./model";
import { Router } from "express";

const queryFoundItemsTemplate = `
SELECT
  uid,
  sname,
  fid,
  fname,
  fdescription,
  fimage,
  fdate,
  locid,
  locdesc,
  bname,
  floor,
  aname
FROM found_item
NATURAL JOIN users
  NATURAL JOIN location
  NATURAL JOIN admin
WHERE `;

const queryCamids = `
    SELECT camid FROM camno WHERE locid = ?; `;

async function createFoundItemFromRow(
  row: Partial<found_itemTemp>
): Promise<found_item> {
  const camids = (await getAllQuery<Camids>(queryCamids, [
    row.locid,
  ])) as Camids[];
  const item = {
    uid: row.uid,
    sname: row.sname,
    fid: row.fid,
    fname: row.fname,
    fdescription: row.fdescription,
    fimage: row.fimage,
    fdate: row.fdate,
    location: {
      locid: row.locid,
      locdesc: row.locdesc,
      bname: row.bname,
      floor: row.floor,
      aname: row.aname,
      camids: camids,
    } as Location,
  };
  return item as found_item;
}

async function getFoundItemsByUser(uid: string): Promise<found_item[]> {
  const queryFoundItems = queryFoundItemsTemplate + "uid = ?;";
  const rows = await getAllQuery<found_itemTemp>(queryFoundItems, [uid]);

  const found_items = (await Promise.all(
    rows.map(async (row) => {
      return await createFoundItemFromRow(row);
    })
  )) as found_item[];
  //console.log((found_items) );
  return found_items;
}

async function getFoundItemsByLostItems(uid: string): Promise<found_item[]> {
  const queryFoundItems =
    queryFoundItemsTemplate +
    `fname IN (
          SELECT lname
          FROM lost_item l
          WHERE
              lname = fname
              AND l.uid = ?
      ) AND fid NOT IN (
          SELECT fid
          FROM resolved
      )
    `;
  const rows = await getAllQuery<found_itemTemp>(queryFoundItems, [uid]);
  const found_items = (await Promise.all(
    rows.map(async (row) => {
      return await createFoundItemFromRow(row);
    })
  )) as found_item[];
  //console.log(found_items);
  return found_items;
}

export async function getFoundItemByID(fid: number): Promise<found_item> {
  const queryFoundItems = queryFoundItemsTemplate + "fid = ?;";
  const row = await getOneQuery<found_itemTemp>(queryFoundItems, [fid]);
  const found_item = await createFoundItemFromRow(row);
  return found_item;
}

const router = Router({ mergeParams: true});

router.get("/:fid", async (req, res) => {
  const id = parseInt(req.params.fid);
  const founditem = await getFoundItemByID(id);
  res.send(founditem);
});

router.get("/lostitems/:uid", async (req, res) => {
  const uid = req.params.uid as string;
  const founditems = await getFoundItemsByLostItems(uid);
  res.send(founditems);
});

router.get("/user/:uid", async (req, res) => {
  const uid = req.params.uid as string;
  const founditems = await getFoundItemsByUser(uid);
  res.send(founditems);
});

export default router;
