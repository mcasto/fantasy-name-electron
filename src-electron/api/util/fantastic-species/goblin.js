import { sample, startCase } from "lodash";

export default (names) => {
  return startCase(
    `${sample(names.vileAndCrude.small)} ${sample(names.vileAndCrude.small)}`
  );
};
