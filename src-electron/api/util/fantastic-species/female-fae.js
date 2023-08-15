import { sample, startCase } from "lodash";

export default (names) => {
  return `${startCase(sample(names.faerykind.prefixes))}${sample(
    names.faerykind.femaleSuffixes
  )}`;
};
