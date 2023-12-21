import { Router } from "express";
import { AddOrUpdateQuery } from "../utils";
import { lost_itemIns, lost_item } from "./model";
import { getLostItemByID } from "./selectqueries";

async function addLostItem(params: lost_itemIns): Promise<lost_item> {
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
  //console.log(JSON.stringify(lostItem));
  return lostItem;
}

const router = Router();
router.post("/", async (req, res) => {
  const lostitem = req.body as lost_itemIns;
  const result = await addLostItem(lostitem);
  res.send(result);
});

export default router;
