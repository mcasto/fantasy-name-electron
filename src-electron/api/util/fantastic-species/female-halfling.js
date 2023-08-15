import { random, sample, startCase } from "lodash";

export default (names) => {
  let name = startCase(
    `${sample(names.homely.syllables)}${sample(names.homely.femaleSuffixes)}`
  );

  if (random(1, 100) > 70)
    name = `${name} ${startCase(sample(names.familyName.english))}`;

  return name;
};
