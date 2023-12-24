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
WHERE   
`;

 async function getUser(uid: string): Promise<User> {
  const queryByUid = query + "uid = ?;";
  const user = await getOneQuery<User>(queryByUid, [uid]);
  //console.log(user as User);
  return user as User;
}

 async function getUserEmail(uid : string) : Promise<string> {
  const user = await getUser(uid);
  return user.email;
}

async function getUserByEmail(email: string): Promise<User> {
  const queryByEmail = query + "email = ?;";
  const user = await getOneQuery<User>(queryByEmail, [email]);
  return user as User;
}

const router = Router({ mergeParams: true});
router.get('/:uid', async (req, res) => {
  const userId = req.params.uid as string;
  const user = await getUser(userId);
  res.send(user);
});

router.get('/:uid/email', async (req, res) => {
  const uid = req.params.uid as string;
  const email = {
    email: await getUserEmail(uid)
  };
  res.send(email);
});

router.get('/email/:email', async (req, res) => {
  const email = req.params.email as string;
  const user = await getUserByEmail(email);

  res.send(user);
});



export default router;