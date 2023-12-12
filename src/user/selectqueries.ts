import { getOneQuery } from "../utils";
import { User } from "./model";

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

export async function getUser(uid: string): Promise<User> {
  const user = await getOneQuery<User>(query, [uid]);
  //console.log(user as User);
  return user as User;
}

export async function getUserEmail(uid : string) : Promise<string> {
  const user = await getUser(uid);
  return user.email;
}