import { startCase, sample, random } from "lodash";

export default async (db) => {
  const mysticOrder = (await db.findOne({ group: "mystic-order" })).data;

  let options = {
    group:
      random(1, 100) < 50
        ? mysticOrder.group.cliques
        : mysticOrder.group.people,
    entity: mysticOrder.entities,
    description: [
      ...mysticOrder.description.quality,
      ...mysticOrder.description.color,
    ],
  };

  const r = random(1, 10);
  const name =
    r < 2
      ? mysticOrder.patterns[0]
      : r < 9
      ? mysticOrder.patterns[1]
      : r < 10
      ? mysticOrder.patterns[2]
      : mysticOrder.patterns[3];

  return name.replace(/<([\w\W]*?)>/g, function (match) {
    match = match.replace(/<|>/g, "");
    return startCase(sample(options[match]));
  });
};
