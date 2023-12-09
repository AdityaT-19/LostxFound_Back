import { AddOrUpdateQuery } from "./utils";
import { found_item, lost_item } from "./model";
import { getLostItemByID, getFoundItemByID } from "./selectqueries";

async function addLostItem(params: {
  lname: string;
  ldescription: string;
  liimage: string;
  ldate: string;
  uid: string;
  probabily_lost_location:
    | { locid: number; locdesc: string | null | undefined }[]
    | null
    | undefined;
}): Promise<lost_item> {
  const queryString = `
    INSERT INTO lost_item
    SET ?;
    `;
    const paramsWithoutLocation = {...params};
    delete paramsWithoutLocation.probabily_lost_location;
  const res = await AddOrUpdateQuery(queryString, [paramsWithoutLocation]);
  if (
    params.probabily_lost_location &&
    params.probabily_lost_location.length > 0
  ) {
    const queryString = `
    INSERT INTO probably_lost_in VALUES (?,?,?);`;
    for (let i = 0; i < params.probabily_lost_location.length; i++) {
      const element = params.probabily_lost_location[i];
      await AddOrUpdateQuery(queryString, [
        res.insertId,
        element.locid,
        element.locdesc ? element.locdesc : null,
      ]);
    }
  }
  const lostItem = await getLostItemByID(res.insertId);
  console.log(JSON.stringify(lostItem));
  return lostItem;
}

async function addFoundItem(params: {
  fname: string;
  fdescription: string;
  fimage: string;
  fdate: string;
  locid: number;
  locdesc: string;
  uid: string;
}): Promise<found_item> {
  const queryString = `
    INSERT INTO found_item
    SET ?;
    `;
  const res = await AddOrUpdateQuery(queryString, [params]);
  const foundItem = await getFoundItemByID(res.insertId);
  return foundItem;
}

const item = {
  lname: "Book",
  ldescription: "A book with a red cover",
  liimage: "imgbook.jpg",
  ldate: "2021-05-01",
  uid: "01JCE21CS004",
  probabily_lost_location: [
    { locid: 1, locdesc: "CSE002" },
    { locid: 2, locdesc: "CSE003" },
  ],
};

const item2 = {
  fname: "Book",
  fdescription: "A book with a red cover",
  fimage: "imgbook.jpg",
  fdate: "2021-05-01",
  locid: 1,
  locdesc: "CSE002",
  uid: "01JCE21CS004",
};
