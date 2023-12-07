import { getOneQuery, getAllQuery } from "./utils";
import { User, Camids, found_item, Location, lost_item } from "./model";

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
  //console.log(user as User);
  
  return user as User;
}

async function getLostItemsByUser(uid: string): Promise<lost_item[]> {
  const queryLostItems = `
  SELECT
  uid,
  sname,
  lid,
  lname,
  ldescription,
  liimage,
  ldate
FROM lost_item
NATURAL JOIN users
WHERE uid = ?;
    `;
  let rows = await getAllQuery<lost_item>(queryLostItems, [uid]);
  const queryLocation = `
  SELECT
  locid,
  locdesc,
  bname,
  floor,
  aname
  FROM probably_lost_in
    NATURAL JOIN location
    NATURAL JOIN admin
  WHERE lid = ?;
      `;

  const queryCamids = `
  SELECT camid FROM camno WHERE locid = ?;
  `;
  rows = await Promise.all(
    rows.map(async (row) => {
      let location = await getAllQuery<Location>(queryLocation, [row.lid]);
      location = await Promise.all(
        location.map(async (loc) => {
          const camids = (await getAllQuery<Camids>(queryCamids, [
            loc.locid,
          ])) as Camids[];
          return { ...loc, camids };
        })
      );
      return { ...row, location };
    })
  );
  //console.log(JSON.stringify(rows) );
  return rows as lost_item[];
}

async function getAllLostItems(): Promise<lost_item[]> {
  const queryLostItems = `
  SELECT
  uid,
  sname,
  lid,
  lname,
  ldescription,
  liimage,
  ldate
FROM lost_item
NATURAL JOIN users;
    `;
  let rows = await getAllQuery<lost_item>(queryLostItems, []);
  const queryLocation = `
  SELECT
  locid,
  locdesc,
  bname,
  floor,
  aname
  FROM probably_lost_in
    NATURAL JOIN location
    NATURAL JOIN admin
  WHERE lid = ?;
      `;

  const queryCamids = `
  SELECT camid FROM camno WHERE locid = ?;
  `;
  rows = await Promise.all(
    rows.map(async (row) => {
      let location = await getAllQuery<Location>(queryLocation, [row.lid]);
      location = await Promise.all(
        location.map(async (loc) => {
          const camids = (await getAllQuery<Camids>(queryCamids, [
            loc.locid,
          ])) as Camids[];
          return { ...loc, camids };
        })
      );
      return { ...row, location };
    })
  );
  //console.log(JSON.stringify(rows) );
  return rows as lost_item[];
}


