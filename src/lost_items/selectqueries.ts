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

export async function getLostItemsByUser(uid: string): Promise<lost_item[]> {
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

export async function getAllLostItems(univid: number): Promise<lost_item[]> {
  const queryLostItems =
    queryLostItemsTemplate +
    `univid = ? 
  AND lid NOT IN (SELECT lid FROM resolved);
  ;`;
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

export async function getRecent5LostItems(univid: number): Promise<lost_item[]> {
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
