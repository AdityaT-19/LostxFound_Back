import { getOneQuery, getAllQuery } from "./utils";
import {
  User,
  Camids,
  found_item,
  Location,
  lost_item,
  found_itemTemp,
} from "./model";

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
  //console.log((rows as lost_item[]) );
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

async function getFoundItemsByUser(uid: string): Promise<found_item[]> {
  const queryFoundItems = `
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
WHERE uid = ?;
  `;
  const rows = await getAllQuery<found_itemTemp>(queryFoundItems, [uid]);
  const queryCamids = `
  SELECT camid FROM camno WHERE locid = ?; `;
  const found_items = (await Promise.all(
    rows.map(async (row) => {
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
    })
  )) as found_item[];
  //console.log((found_items) );
  return found_items;
}

async function getFoundItemsByLostItems(uid :string): Promise<found_item[]> {
  const queryFoundItems = `
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
FROM found_item f
    NATURAL JOIN users
    NATURAL JOIN location
    NATURAL JOIN admin
WHERE fname IN (
        SELECT lname
        FROM lost_item l
        WHERE
            lname = fname
            AND l.uid = ?
    );
  `;
  const rows = await getAllQuery<found_itemTemp>(queryFoundItems, [uid]);
  const queryCamids = `SELECT camid FROM camno WHERE locid = ?;`;
  const found_items = (await Promise.all(
    rows.map(async (row) => {
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
    })
  )) as found_item[];
  console.log((found_items) );
  return found_items;
}

async function getLostItemByID(lid: number): Promise<lost_item> {
  const queryLostItem = `
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
WHERE lid = ?;
    `;
  let row = await getOneQuery<lost_item>(queryLostItem, [lid]);
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
      let location = await getAllQuery<Location>(queryLocation, [row.lid]);
      location = await Promise.all(
        location.map(async (loc) => {
          const camids = (await getAllQuery<Camids>(queryCamids, [
            loc.locid,
          ])) as Camids[];
          return { ...loc, camids };
        })
      );
      row = { ...row, location };
    
  //console.log((row as lost_item) );
  return row as lost_item;
}

async function getFoundItemByID(fid: number): Promise<found_item> {
  const queryFoundItems = `
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
WHERE fid = ?;
  `;
  const row = await getOneQuery<found_itemTemp>(queryFoundItems, [fid]);
  const queryCamids = `
  SELECT camid FROM camno WHERE locid = ?; `;
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
      console.log((item) as found_item);
      return item as found_item;
    
  
}

getFoundItemByID(1);