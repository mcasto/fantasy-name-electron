// mc-todo: add isValid check to each generator function

const { flatten, template } = require("lodash");
const util = {
  flatten,
  getSample: require("./util/get-sample"),
};
const chain = require("./util/markov-chain-generator");

const maxAttempts = 1000;

const generateFantasticSpecies = async (db, config) => {
  const rec = await db.findOne({ table: "species" });

  const names = [];
  let attempts = 0;
  while (names.length < config.num && attempts < maxAttempts) {
    attempts++;

    const pattern = util.getSample(rec.patterns[config.species]);

    const compiled = template(pattern);
    const name = compiled({ util, dictionary: rec.dictionary });
    names.push(name.toLowerCase());
  }

  return names;
};

const generateFantasyNames = async (db, config) => {
  const rec = await db.findOne({ table: "fantasy-names" });

  const names = [];
  let attempts = 0;
  while (names.length < config.num && attempts < maxAttempts) {
    attempts++;

    const pattern = util.getSample(rec.patterns);
    const compiled = template(pattern);
    const name = compiled({ util, dictionary: rec.dictionary });
    names.push(name);
  }

  return names;
};

const generateGroups = async (db, config) => {
  const rec = await db.findOne({ table: "groups" });

  const commander =
    config.type == "militaryUnit"
      ? await generateFantasyName(db, config)
      : null;

  const names = [];
  let attempts = 0;
  while (names.length < config.num && attempts < maxAttempts) {
    attempts++;

    const pattern = util.getSample(rec.patterns[config.type]);

    // console.log({ pattern });

    const compiled = template(pattern);
    const name = compiled({ util, commander, dictionary: rec.dictionary });
    names.push(name.toLowerCase());
  }

  return names;
};

const generateMarkovs = async (db, config) => {
  const rec = await db.findOne({ table: "markov" });

  const names = [];
  let attempts = 0;
  while (names.length < config.num && attempts < maxAttempts) {
    attempts++;

    // Generate a name
    chain.refresh();
    if (config.order) chain.setOrder(config.order);
    chain.addWordsToChain(rec.tables[config.table]);
    names.push(chain.generateWord(config));
  }

  return names;
};

const generateTaverns = async (db, config) => {
  const rec = await db.findOne({ table: "taverns" });

  const names = [];
  let attempts = 0;
  while (names.length < config.num && attempts < maxAttempts) {
    attempts++;

    const pattern = util.getSample(rec.patterns);

    const compiled = template(pattern);
    const name = compiled({ util, dictionary: rec.dictionary });
    names.push(name);
  }

  return names;
};

module.exports = {
  generateFantasticSpecies,
  generateFantasyNames,
  generateGroups,
  generateMarkovs,
  generateTaverns,
};
