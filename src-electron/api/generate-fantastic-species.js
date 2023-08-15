import { camelCase } from "lodash";

import altFemaleDarkElf from "./util/fantastic-species/alt-female-dark-elf";
import altFemaleElf from "./util/fantastic-species/alt-female-elf";
import altMaleDarkElf from "./util/fantastic-species/alt-male-dark-elf";
import altMaleElf from "./util/fantastic-species/alt-male-elf";
import altMaleFae from "./util/fantastic-species/alt-male-fae";
import demon from "./util/fantastic-species/demon";
import femaleAngel from "./util/fantastic-species/female-angel";
import femaleCavemen from "./util/fantastic-species/female-cavemen";
import femaleDarkElf from "./util/fantastic-species/female-dark-elf";
import femaleDragon from "./util/fantastic-species/female-dragon";
import femaleDwarf from "./util/fantastic-species/female-dwarf";
import femaleElf from "./util/fantastic-species/female-elf";
import femaleFae from "./util/fantastic-species/female-fae";
import femaleGnome from "./util/fantastic-species/female-gnome";
import femaleHalfDemon from "./util/fantastic-species/female-half-demon";
import femaleHalfling from "./util/fantastic-species/female-halfling";
import goblin from "./util/fantastic-species/goblin";
import maleAngel from "./util/fantastic-species/male-angel";
import maleCavemen from "./util/fantastic-species/male-cavemen";
import maleDarkElf from "./util/fantastic-species/male-dark-elf";
import maleDragon from "./util/fantastic-species/male-dragon";
import maleDwarf from "./util/fantastic-species/male-dwarf";
import maleElf from "./util/fantastic-species/male-elf";
import maleFae from "./util/fantastic-species/male-fae";
import maleGnome from "./util/fantastic-species/male-gnome";
import maleHalfDemon from "./util/fantastic-species/male-half-demon";
import maleHalfling from "./util/fantastic-species/male-halfling";
import ogre from "./util/fantastic-species/ogre";
import orc from "./util/fantastic-species/orc";

const generators = {
  altFemaleDarkElf,
  altFemaleElf,
  altMaleDarkElf,
  altMaleElf,
  altMaleFae,
  demon,
  femaleAngel,
  femaleCavemen,
  femaleDarkElf,
  femaleDragon,
  femaleDwarf,
  femaleElf,
  femaleFae,
  femaleGnome,
  femaleHalfDemon,
  femaleHalfling,
  goblin,
  maleAngel,
  maleCavemen,
  maleDarkElf,
  maleDragon,
  maleDwarf,
  maleElf,
  maleFae,
  maleGnome,
  maleHalfDemon,
  maleHalfling,
  ogre,
  orc,
};

const maxAttempts = 1000;

export default async (db, config) => {
  if (!config) return [];

  const { species, num } = config;

  const { names } = await db.findOne({
    table: "species",
    names: { $exists: true },
  });

  const results = [];
  let attempts = 0;
  while (results.length < num || attempts > maxAttempts) {
    attempts++;

    const result = generators[camelCase(species)](names);

    results.push(result);
  }

  return results;
};
