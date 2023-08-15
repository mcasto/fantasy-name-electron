import { sample, times } from "lodash";

const maxAttempts = 1000;

export default async (db, config) => {
  if (!config) return [];

  const { num } = config;

  const { names } = await db.findOne({ table: "fantasy-names" });

  const results = [];
  let attempts = 0;
  while (results.length < num || attempts > maxAttempts) {
    attempts++;
    const choices = [
      ...times(3, () => sample(names[0])),
      ...times(9, () => sample(names[1])),
      ...times(5, () => sample(names[2])),
      sample(names[3]),
      `${sample(names[0])} ${sample(names[1])}`,
      `${sample(names[1])} ${sample(names[0])}`,
      `${sample(sample(names))} ${sample(sample(names))}`,
    ];

    const result = sample(choices);

    results.push(result);
  }

  return results;
};
