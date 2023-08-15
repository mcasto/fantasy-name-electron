import { sample, startCase } from "lodash";

export default (names) => {
  return startCase(
    `${sample(names.vileAndCrude.medium)} ${sample(names.vileAndCrude.medium)}`
  );
};
