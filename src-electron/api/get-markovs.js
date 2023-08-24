import { camelCase, startCase } from "lodash";

export default async (db) => {
  const rec = await db.findOne({ table: "markovs" });
  return Object.keys(rec.dictionaries).map((dictionary) => {
    return {
      name: startCase(dictionary),
      id: camelCase(dictionary),
    };
  });
};
