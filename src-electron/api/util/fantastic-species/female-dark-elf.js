import { random, sample, startCase } from "lodash";

export default (names) => {
  let name = startCase(sample(names.elegantEvil.prefixesDarkElves));
  if (random(1, 100) > 66) {
    name = `${name}${sample(names.elegantEvil.middle)}`;
  }
  name = `${name}${sample(names.elegantEvil.femaleSuffixes)}`;

  return name;
};
