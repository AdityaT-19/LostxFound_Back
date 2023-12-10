import { RowDataPacket } from "mysql2";

export interface User extends RowDataPacket {
  univid: number;
  uid: string;
  sname: string;
  email: string;
  address: string;
  phone: number;
  lostitems: number;
  founditems: number;
}
