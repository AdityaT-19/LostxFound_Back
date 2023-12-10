import { RowDataPacket } from "mysql2";

export interface Camids extends RowDataPacket {
  camid: number;
}

export interface Location extends RowDataPacket {
  locid: number;
  locdesc: string | undefined | null;
  bname: string;
  floor: number;
  aname: string;
  camids: Camids[];
}
