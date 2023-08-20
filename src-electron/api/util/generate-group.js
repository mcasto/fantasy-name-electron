import { sample, fill, flatten, isArray, upperFirst } from "lodash";

// import getSample from "./get-sample";

// Weirdly, importing this does not work. It throws an error saying the getSample function isn't defined.

const getSample = (items) => {
  const item = sample(
    flatten(
      items.map(({ value, count }) => {
        return fill(Array(count), value);
      })
    )
  );

  return isArray(item) ? getSample(item) : item;
};

// Weirdly, coding the function here instead of importing it works fine, even though this should be the same as importing. Oh well.

import generateFantasyName from "../generate-fantasy-name";

export default async (db, rec) => {
  const utils = { commander: await generateFantasyName(db, { num: 1 }) };

  // get pattern
  const pattern = getSample(rec.patterns);

  // get words from pattern
  const words = pattern.split(" ");

  // build output
  const output = words
    .map((word) => {
      if (!/[\{\}]/.test(word)) return word;

      const [original, table] = word.match(/\{([^}]+)\}/, "");
      let replacement = "N/A";

      // look up in table
      if (rec.tables[table]) {
        replacement = getSample(rec.tables[table]);
      }

      // else check for util
      if (Object.hasOwn(utils, table)) {
        console.log({ table, value: utils[table] });
        replacement = utils[table];
      }

      return upperFirst(word.replace(original, replacement));
    })
    .join(" ");

  return output;
};
