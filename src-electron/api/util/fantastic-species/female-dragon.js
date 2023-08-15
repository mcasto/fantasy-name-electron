import { sample, startCase } from "lodash";

export default (names) => {
  let name = startCase(sample(names.draconic.prefixes));
  let suffix = sample(names.draconic.suffixes);

  suffix =
    suffix == "bazius"
      ? "bazia"
      : suffix.slice(-2) == "os"
      ? `${suffix.slice(0, 2)}ossa`
      : `${suffix}is`;

  return `${name}${suffix}`;
};
