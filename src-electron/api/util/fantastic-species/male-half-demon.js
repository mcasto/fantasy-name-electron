import { sample, startCase } from "lodash";

export default (names) => {
  return `${startCase(sample(names.malevolent.prefixes))}${sample(
    names.malevolent.maleSuffixes
  )}`;
};
