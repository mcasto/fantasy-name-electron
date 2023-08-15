import { startCase, sample } from "lodash";
import isValid from "./util/is-valid";

const maxAttempts = 1000;

export default async (db, config) => {
  if (!config) return [];

  const { num } = config;

  const { nouns, adjectives, titles } = (
    await db.findOne({ table: "tavern" })
  ).defaults;

  const results = [];
  let attempts = 0;
  while (results.length < num || attempts > maxAttempts) {
    attempts++;

    const patterns = [
      `${startCase(sample(adjectives))} ${startCase(sample(nouns))}`,
      `${startCase(sample(adjectives))} ${startCase(sample(nouns))} ${startCase(
        sample(titles)
      )}`,
      `The ${startCase(sample(adjectives))} ${startCase(sample(nouns))}`,
      `The ${startCase(sample(adjectives))} ${startCase(
        sample(nouns)
      )} ${startCase(sample(titles))}`,
      `${startCase(sample(nouns))} & ${startCase(sample(nouns))}`,
      `${startCase(sample(nouns))} & ${startCase(sample(nouns))} ${startCase(
        sample(titles)
      )}`,
      `${startCase(sample(adjectives))} ${startCase(sample(titles))}`,
      `The ${startCase(sample(adjectives))} ${startCase(sample(titles))}`,
    ];

    const result = sample(patterns);

    if (!isValid(result, config)) continue;

    results.push(result);
  }

  return results;
};
