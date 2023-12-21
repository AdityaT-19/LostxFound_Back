import express from "express";
import { getAllQuery } from "../utils";
import { Location, Camids } from "./model";

const queryCamids = `
    SELECT camid FROM camno WHERE locid = ?;
    `;

async function getAllLocations(univid: number): Promise<Location[]> {
  const queryLocations = `
    SELECT
    locid,
    bname,
    floor,
    aname
  FROM location
  NATURAL JOIN admin
  WHERE univid = ?;
      `;
  const rows = await getAllQuery<Location>(queryLocations, [univid]);
  const locations = await Promise.all(
    rows.map(async (loc) => {
      const camids = (await getAllQuery<Camids>(queryCamids, [
        loc.locid,
      ])) as Camids[];
      return { ...loc, camids };
    })
  );
  //console.log((locations) as Location[]);
  return locations as Location[];
}

export async function getLocationFromPLL(lid: number): Promise<Location[]> {
  const queryLocation = `
  SELECT
  locid,
  locdesc,
  bname,
  floor,
  aname
  FROM probably_lost_in
    NATURAL JOIN location
    NATURAL JOIN admin
  WHERE lid = ?;
      `;

  let location = await getAllQuery<Location>(queryLocation, [lid]);
  location = await Promise.all(
    location.map(async (loc) => {
      const camids = (await getAllQuery<Camids>(queryCamids, [
        loc.locid,
      ])) as Camids[];
      return { ...loc, camids };
    })
  );
  return location as Location[];
}

var router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  //@ts-ignore
  const univid = parseInt(req.params.univid);
  const locations = await getAllLocations(univid);
  res.send(locations);
});

export default router;
