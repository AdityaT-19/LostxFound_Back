import { getOneQuery } from "../utils";
import { User } from "./model";
import {Router} from 'express';

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

 async function getUser(uid: string): Promise<User> {
  const user = await getOneQuery<User>(query, [uid]);
  //console.log(user as User);
  return user as User;
}

 async function getUserEmail(uid : string) : Promise<string> {
  const user = await getUser(uid);
  return user.email;
}

const router = Router();
router.get('/:uid', async (req, res) => {
  const userId = req.params.uid as string;
  const user = await getUser(userId);
  res.send(user);
});

router.get('/:uid/email', async (req, res) => {
  const uid = req.params.uid as string;
  const email = await getUserEmail(uid);
  res.send(email);
});

export default router;