import { camelCase, startCase } from "lodash";

export default async (db) => {
  const rec = await db.findOne({ table: "groups" });
  return Object.keys(rec.dictionary).map((group) => {
    return {
      name: startCase(group),
      id: camelCase(group),
    };
  });
};
