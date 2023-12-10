import { RowDataPacket } from "mysql2";
import { Location } from "../locations/model";

export interface lost_item extends RowDataPacket {
  uid: string;
  sname: string;
  lid: number;
  lname: string;
  ldescription: string;
  liimage: string;
  ldate: string;
  probably_lost: Location[];
}

export interface lost_itemIns {
  lname: string;
  ldescription: string;
  liimage: string;
  ldate: string;
  uid: string;
  probabily_lost_location:
    | {
        locid: number;
        locdesc: string | null | undefined;
      }[]
    | null
    | undefined;
}
