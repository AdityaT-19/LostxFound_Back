import { RowDataPacket } from "mysql2";
import { Location, Camids } from "../locations/model";

export interface found_item extends RowDataPacket {
  uid: string;
  sname: string;
  fid: number;
  fname: string;
  fdescription: string;
  fimage: string;
  fdate: string;
  location: Location;
}

export interface found_itemTemp extends RowDataPacket {
  uid: string;
  sname: string;
  fid: number;
  fname: string;
  fdescription: string;
  fimage: string;
  fdate: string;
  locid: number;
  locdesc: string;
  bname: string;
  floor: number;
  aname: string;
  camids: Camids[];
}

export interface found_itemIns {
  fname: string;
  fdescription: string;
  fimage: string;
  fdate: string;
  locid: number;
  locdesc: string;
  uid: string;
}
