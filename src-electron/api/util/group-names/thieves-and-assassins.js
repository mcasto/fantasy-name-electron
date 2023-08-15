import { random, sample, startCase } from "lodash";

export default async (db) => {
  const rogues = (await db.findOne({ group: "thieves-and-assassins" })).data;

  let r = random(1, 30),
    name;

  name =
    r < 6
      ? `${startCase(sample(rogues.roles))} of ${startCase(
          sample(rogues.goals)
        )}`
      : r < 11
      ? `${startCase(sample(rogues.adjectives))} ${startCase(
          sample(rogues.actions)
        )} ${startCase(sample(rogues.titles))}`
      : `${startCase(sample(rogues.descriptions))} ${startCase(
          sample(sample(rogues.groups))
        )}`;

  return name;
};
