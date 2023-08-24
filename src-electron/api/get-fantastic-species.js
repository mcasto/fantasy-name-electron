import { camelCase, startCase } from "lodash";

export default async (db) => {
  const rec = await db.findOne({ table: "fantasticSpecies" }).sort({ name: 1 });
  return Object.keys(rec.patterns).map((species) => ({
    name: startCase(species),
    id: camelCase(species),
  }));
};
