import { random, sample, startCase } from "lodash";

export default (names) => {
  let name = startCase(sample(names.primitive.names));
  if (random(0, 1) == 1) {
    name = `${name}-${startCase(sample(names.primitive.names))}`;
  }
  name = `${name}-${startCase(sample(names.primitive.suffixes))}`;

  return name;
};
