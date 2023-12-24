import { Router } from "express";
import { AddOrUpdateQuery } from "../utils";
import { found_itemIns, found_item } from "./model";
import { getFoundItemByID } from "./selectqueries";

async function addFoundItem(params: found_itemIns): Promise<found_item> {
  const queryString = `
      INSERT INTO found_item
      SET ?;
      `;
  const res = await AddOrUpdateQuery(queryString, [params]);
  const foundItem = await getFoundItemByID(res.insertId);
  return foundItem;
}

const router = Router();

router.post("/", async (req, res) => {
  const founditem = req.body as found_itemIns;
  const result = await addFoundItem(founditem);
  res.send(result);
});

export default router;
