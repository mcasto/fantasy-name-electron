import { random, sample, slice, startCase } from "lodash";

export default (names) => {
  let name = startCase(sample(names.imperial.prefixes));
  const r = random(1, 100);

  if (r <= 8) {
    const end = name.slice(-2);

    name = `${name.substring(0, name.lastIndexOf("a"))}e${name.substring(
      name.lastIndexOf("a") + 1
    )}`;

    name =
      end != "ar" && end != "al"
        ? `${startCase(sample(names.imperial.titles))}${name}`
        : end == "ar"
        ? `${startCase(sample(slice(names.imperial.titles, 4, 8)))}${name}`
        : `${startCase(sample(slice(names.imperial.titles, 0, 4)))}${name}`;
  }

  if (r > 8) {
    name = `${name}${sample(names.imperial.femaleSuffixes)}`;
  }

  return name;
};
