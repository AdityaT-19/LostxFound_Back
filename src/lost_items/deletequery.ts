import { ResultSetHeader } from "mysql2";
import { AddOrUpdateQuery } from "../utils";

export async function deleteLostItem(lid: number): Promise<ResultSetHeader> {
  const queryString = `
    DELETE FROM lost_item WHERE lid = ?;
    `;
  const res = await AddOrUpdateQuery(queryString, [lid]);
  return res;
}
