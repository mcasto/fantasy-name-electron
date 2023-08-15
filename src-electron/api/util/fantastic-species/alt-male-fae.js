import { sample, startCase } from "lodash";

export default (names) => {
  return `${startCase(sample(names.alternativeFaerykind.prefixes))}${sample(
    names.faerykind.maleSuffixes
  )}`;
};
