import { random, sample, startCase } from "lodash";

export default (names) => {
  let name = startCase(sample(names.doughty.syllables));
  name =
    random(1, 100) > 80
      ? `${name}${"aeiou".includes(name.slice(-1)) ? "r" : "i"}`
      : `${name}${sample(names.doughty.maleSuffixes)}`;
  return name;
};
