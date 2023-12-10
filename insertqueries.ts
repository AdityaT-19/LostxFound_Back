import { AddOrUpdateQuery } from "./utils";
import { found_item, found_itemIns, lost_item, lost_itemIns } from "./model";
import { getLostItemByID, getFoundItemByID } from "./selectqueries";

export async function addLostItem(params: lost_itemIns): Promise<lost_item> {
  const queryString = `
    INSERT INTO lost_item
    SET ?;
    `;
  const paramsWithoutLocation = { ...params };
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

export async function addFoundItem(params: found_itemIns): Promise<found_item> {
  const queryString = `
    INSERT INTO found_item
    SET ?;
    `;
  const res = await AddOrUpdateQuery(queryString, [params]);
  const foundItem = await getFoundItemByID(res.insertId);
  return foundItem;
}
