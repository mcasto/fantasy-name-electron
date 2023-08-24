// mc-todo: next step = tie these generators into the code for the frontend

const nedb = require("nedb-promises");
const db = nedb.create(
  "/Users/mike/Library/Application Support/Electron/dictionaries.nedb"
);

const generate = require("./generate");

const config = {
  num: 100000,
  dictionary: "ancientGreekCities",
  type: "militaryUnit",
  species: "alternativeFemaleDarkElf",
};

// for each table, call generator to generate 100000 names
// for markovs & groups, generate 100000 for each dictionary

(async () => {
  const tables = await db.find({}, { table: 1 }).sort({ table: 1 });

  for (let { table } of tables) {
    config.table = table;

    if (["groups", "markovs"].includes(table)) {
      if (table == "markovs") {
        const rec = await db.findOne({ table: "markovs" });
        const dictionaries = Object.keys(rec.dictionaries);
        for (let dictionary of dictionaries) {
          config.dictionary = dictionary;
          generate[table](db, config).then((results) => {
            console.log({
              table,
              dictionary,
              results: results.length,
            });
          });
        }
      }

      if (table == "groups") {
        const rec = await db.findOne({ table: "groups" });
        const dictionaries = Object.keys(rec.dictionary);
        for (let dictionary of dictionaries) {
          config.type = dictionary;
          generate[table](db, config).then((results) => {
            console.log({
              table,
              dictionary,
              results: results.length,
            });
          });
        }
      }
      continue;
    }

    generate[table](db, config).then((results) => {
      console.log({
        table,
        results: results.length,
      });
    });
  }
})();
