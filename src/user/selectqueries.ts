import { getOneQuery } from "../utils";
import { User } from "./model";


export async function getUser(uid: string): Promise<User> {
    const query = `
      SELECT
      univid,
      uid,
      sname,
      phno,
      email,
      address,
      foundcount,
      lostcount
      FROM users
      WHERE uid = ?  
      `;
    const user = await getOneQuery<User>(query, [uid]);
    //console.log(user as User);
    return user as User;
  }
  