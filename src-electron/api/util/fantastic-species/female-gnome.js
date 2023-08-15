import { random, sample, startCase } from "lodash";

export default (names) => {
  let name = startCase(sample(names.doughty.syllables));

  if ("aeiou".includes(name.slice(-1))) name = `${name}l`;

  name = `${name}${sample(names.homely.femaleSuffixes)}`;

  if (random(1, 100) > 70)
    name = `${name} ${startCase(sample(names.familyName.scottish))}`;

  return name;
};
