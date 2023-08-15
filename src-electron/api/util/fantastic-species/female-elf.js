import { sample, startCase } from "lodash";

export default (names) => {
  return `${startCase(sample(names.fairAndNoble.elfprefixes))}${sample(
    names.fairAndNoble.middle
  )}${sample(names.fairAndNoble.femaleSuffixes)}`;
};
