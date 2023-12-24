import { ResultSetHeader } from "mysql2";
import { AddOrUpdateQuery } from "../utils";
import { Router } from "express";

async function deleteLostItem(lid: number): Promise<ResultSetHeader> {
  const queryString = `
    DELETE FROM lost_item WHERE lid = ?;
    `;
  const res = await AddOrUpdateQuery(queryString, [lid]);
  return res;
}

const router = Router();

router.delete("/:lid", async (req, res) => {
  const lid = parseInt(req.params.lid);
  const result = await deleteLostItem(lid);
  res.send(result);
});

export default router;
