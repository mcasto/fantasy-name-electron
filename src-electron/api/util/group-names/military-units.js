import { startCase, random, sample } from "lodash";
import generateFantasyName from "../../generate-fantasy-name";

export default async (db) => {
  const militaryUnit = (await db.findOne({ group: "military-unit" })).data;

  let options = {
    commander: [],
    group: sample(militaryUnit.groups),
    description: [
      ...militaryUnit.description.color,
      ...militaryUnit.description.other,
    ],
    place: [...militaryUnit.places.seas, ...militaryUnit.places.lands],
  };

  const r = random(1, 10);

  if (r < 2) options.commander = [generateFantasyName()];

  const name =
    r < 2
      ? militaryUnit.patterns[0]
      : r < 8
      ? militaryUnit.patterns[1]
      : r < 10
      ? militaryUnit.patterns[2]
      : militaryUnit.patterns[3];

  const retName = name.replace(/<([\w\W]*?)>/g, function (match) {
    var item, index;

    match = match.replace(/<|>/g, "");

    item = sample(options[match]);
    options[match] = options[match].filter((el) => el != item);

    return startCase(item);
  });

  return retName;
};
