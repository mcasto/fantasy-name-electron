import {  sample, startCase } from "lodash";

export default (names) => {
  return `${startCase(sample(names.draconic.prefixes))}${sample(
    names.draconic.suffixes
  )}`;
};
