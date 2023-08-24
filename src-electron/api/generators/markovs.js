const { upperFirst } = require("lodash");
const chain = require("../util/markov-chain-generator");

const maxAttempts = 1000;

module.exports = async (db, config) => {
  const rec = await db.findOne({ table: config.table });

  const names = [];
  let attempts = 0;
  while (names.length < config.num && attempts < maxAttempts) {
    attempts++;

    // Generate a name
    chain.refresh();
    if (config.order) chain.setOrder(config.order);
    chain.addWordsToChain(rec.dictionaries[config.dictionary]);
    names.push(
      chain
        .generateWord(config)
        .toLowerCase()
        .split(" ")
        .map((str) => upperFirst(str))
        .join(" ")
    );
  }

  return names;
};
