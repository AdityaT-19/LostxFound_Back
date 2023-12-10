import { RowDataPacket } from "mysql2";

export interface User extends RowDataPacket {
  univid : number;
  uid: string;
  sname: string;
  email: string;
  address: string;
  phone: number;
  lostitems: number;
  founditems: number;
}

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

export interface lost_itemIns 
  {
    lname: string;
    ldescription: string;
    liimage: string;
    ldate: string;
    uid: string;
    probabily_lost_location:
      | { locid: number; locdesc: string | null | undefined }[]
      | null
      | undefined;
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