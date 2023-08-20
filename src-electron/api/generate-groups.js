import generateGroup from "./util/generate-group";

const maxAttempts = 1000;

export default async (db, config) => {
  if (!config) return [];
  const { group, num } = config;

  const rec = await db.findOne({ table: "groups", group });

  const results = [];
  let attempts = 0;
  while (results.length < num || attempts > maxAttempts) {
    attempts++;
    results.push(await generateGroup(db, rec));
  }

  return results;
};
