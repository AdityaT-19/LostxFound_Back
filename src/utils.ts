import { pool } from "./connection";
import { ResultSetHeader } from "mysql2";

export async function getAllQuery<T>(
  queryString: string,
  params: any[]
): Promise<Partial<T>[]> {
  const [rows] = await pool.execute(queryString, params);
  return rows as T[];
}

export async function getOneQuery<T>(
  queryString: string,
  params: any[]
): Promise<Partial<T>> {
  const [rows] = await pool.execute(queryString, params) as any[];
  return rows[0] as T;
}

export async function AddOrUpdateQuery(
  queryString: string,
  params: any[]
): Promise<ResultSetHeader> {
  const [rows] = await pool.query(queryString, params);
  return rows as ResultSetHeader;
}

export async function DeleteQuery(
  queryString: string,
  params: any[]
): Promise<ResultSetHeader> {
  const [rows] = await pool.execute(queryString, params);
  return rows as ResultSetHeader;
}
