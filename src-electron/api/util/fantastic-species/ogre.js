import { sample, startCase } from "lodash";

export default (names) => {
  return startCase(
    `${sample(names.vileAndCrude.large)} ${sample(names.vileAndCrude.large)}`
  );
};
