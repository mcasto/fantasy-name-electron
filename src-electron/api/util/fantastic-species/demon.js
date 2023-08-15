import { sample, startCase } from "lodash";

export default (names) => {
  const formats = [
    `${startCase(sample(names.infernal.softs))}${sample(names.infernal.dulls)}`,
    `${startCase(sample(names.infernal.softs))}${sample(
      names.infernal.sharps
    )}`,
    `${startCase(sample(names.infernal.dulls))}${sample(names.infernal.softs)}`,
    `${startCase(sample(names.infernal.dulls))}${sample(
      names.infernal.sharps
    )}`,
    `${startCase(sample(names.infernal.dulls))}${sample(names.infernal.softs)}`,
    `${startCase(sample(names.infernal.sharps))}${sample(
      names.infernal.dulls
    )}`,
  ];

  return sample(formats);
};
