const { flatten, template, upperFirst } = require("lodash");
const util = {
  flatten,
  getSample: require("../util/get-sample"),
};

const maxAttempts = 1000;

module.exports = async (db, config) => {
  const rec = await db.findOne({ table: config.table });

  const names = [];
  let attempts = 0;
  while (names.length < config.num && attempts < maxAttempts) {
    attempts++;

    const pattern = util.getSample(rec.patterns[config.species]);

    const compiled = template(pattern);
    const name = compiled({ util, dictionary: rec.dictionary });
    names.push(
      name
        .toLowerCase()
        .split(" ")
        .map((str) => upperFirst(str))
        .join(" ")
    );
  }

  return names;
};
