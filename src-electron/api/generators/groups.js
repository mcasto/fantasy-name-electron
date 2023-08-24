const { flatten, template, upperFirst } = require("lodash");
const util = {
  flatten,
  getSample: require("../util/get-sample"),
  getCommander: (rec) => {
    const pattern = util.getSample(rec.patterns);
    const compiled = template(pattern);
    const name = compiled({ util, dictionary: rec.dictionary });
    return name
      .toLowerCase()
      .split(" ")
      .map((str) => upperFirst(str))
      .join(" ");
  },
};

const maxAttempts = 1000;

module.exports = async (db, config) => {
  const rec = await db.findOne({ table: config.table });
  util.commanderNames = await db.findOne({ table: "fantasyNames" });

  const names = [];
  let attempts = 0;
  while (names.length < config.num && attempts < maxAttempts) {
    attempts++;

    const pattern = util.getSample(rec.patterns[config.type]);

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
