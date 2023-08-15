import { random, sample, startCase } from "lodash";

export default (names) => {
  const d10 = random(1, 10);
  let name = startCase(sample(names.primitive.names));
  if (d10 > 3) name = `${name}-${startCase(sample(names.primitive.names))}`;
  if (d10 > 8) name = `${name}-${startCase(sample(names.primitive.suffixes))}`;

  return name;
};
