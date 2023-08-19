import { camelCase } from "lodash";

import militaryUnit from "./util/group-names/military-units";
import mysticOrder from "./util/group-names/mystic-order";
import thievesAndAssassins from "./util/group-names/thieves-and-assassins";

const generators = {
  militaryUnit,
  mysticOrder,
  thievesAndAssassins,
};

const maxAttempts = 1000;

export default async (db, config) => {
  if (!config) return [];

  const { group, num } = config;

  const results = [];
  let attempts = 0;
  while (results.length < num || attempts > maxAttempts) {
    attempts++;

    const result = await generators[camelCase(group)](db);

    results.push(result);
  }

  return results;
};
