import { sample, startCase, isArray } from "lodash";

export default async (db) => {
  const rec = await db.findOne({
    table: "groups",
    group: "thieves-and-assassins",
  });

  const pattern = sample(rec.data.patterns);
  const words = pattern.split(" ");

  const output = words
    .map((word) => {
      if (!/[\{\}]/.test(word)) return word;

      const fill = word.replace(/[{}]/g, "");
      let retWord = sample(rec.data[fill]);

      if (isArray(retWord)) retWord = sample(retWord);

      return retWord;
    })
    .join(" ");

  return startCase(output);
};
