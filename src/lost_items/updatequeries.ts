import { AddOrUpdateQuery } from "../utils";
import { lost_itemIns, lost_item } from "./model";
import { getLostItemByID } from "./selectqueries";

export async function updateLostItem(
  item: Partial<lost_itemIns>,
  lid: number
): Promise<lost_item> {
  const keys = Object.keys(item) as (keyof lost_itemIns)[];
  const updateItem = keys
    .filter((k) => item[k] !== undefined || item[k] !== null)
    .reduce((a, k) => ({ ...a, [k]: item[k] }), {} as Partial<lost_itemIns>);
  const updateItemWithoutLoc = { ...updateItem };
  if (
    updateItemWithoutLoc.probabily_lost_location &&
    updateItemWithoutLoc.probabily_lost_location.length > 0
  ) {
    delete updateItemWithoutLoc.probabily_lost_location;
  }
  if (
    updateItem.probabily_lost_location &&
    updateItem.probabily_lost_location.length > 0
  ) {
    const queryString = `
          INSERT INTO probably_lost_in VALUES (?,?,?);`;
    for (let i = 0; i < updateItem.probabily_lost_location.length; i++) {
      const element = updateItem.probabily_lost_location[i];
      await AddOrUpdateQuery(queryString, [
        lid,
        element.locid,
        element.locdesc ? element.locdesc : null,
      ]);
    }
  }
  if (updateItemWithoutLoc && Object.keys(updateItemWithoutLoc).length > 0) {
    const updateQuery = `UPDATE lost_item
    SET
        ?
    WHERE
        lid = ?;`;
    const res = await AddOrUpdateQuery(updateQuery, [
      updateItemWithoutLoc,
      lid,
    ]);
  }
  const lostItem = await getLostItemByID(lid);
  return lostItem;
}
