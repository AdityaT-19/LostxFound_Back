import { getOneQuery, getAllQuery } from "./utils";
import { User, Camids, found_item, Location, lost_item } from "./model";
import { query } from "express";

async function getUser(uid: string): Promise<User> {
  const query = `
    SELECT
    uid,
    sname,
    phno,
    email,
    address,
    foundcount,
    lostcount
    FROM users
    WHERE uid = ?
    `;
  const user = await getOneQuery<User>(query, [uid]);
  return user as User;
}

async function getLostItems(uid: string) {
  const queryLostItems = `
    SELECT
    lid,
    lname,
    ldescription,
    liimage,
    ldate
FROM lost_item
WHERE uid = ?;
    `;
  let rows = await getAllQuery<lost_item>(queryLostItems, [uid]);
  rows = await Promise.all(
    rows.map<Partial<lost_item>>((li: lost_item) => {
      return li;
    })
  );
}
