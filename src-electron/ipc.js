const { app, ipcMain } = require("electron");

import nedb from "nedb-promises";
import generateFantasticSpecies from "./api/generate-fantastic-species";
import generateGroups from "./api/generate-groups";
import generateMarkov from "./api/generate-markov";
import generateFantasyName from "./api/generate-fantasy-name";
import generateTavern from "./api/generate-tavern";
import getFantasticSpecies from "./api/get-fantastic-species";
import getGroups from "./api/get-groups";
import getMarkov from "./api/get-markov";
import initDatabase from "./api/init-database";

import { join } from "path";

const dbFile = join(app.getPath("userData"), "dictionaries.nedb");
const db = nedb.create(dbFile);

ipcMain.handle("generateFantasticSpecies", (e, config) =>
  generateFantasticSpecies(db, config)
);
ipcMain.handle("generateGroups", (e, config) => generateGroups(db, config));
ipcMain.handle("generateMarkov", (e, config) => generateMarkov(db, config));
ipcMain.handle("generateFantasyName", (e, config) =>
  generateFantasyName(db, config)
);
ipcMain.handle("generateTavern", (e, config) => generateTavern(db, config));
ipcMain.handle("getFantasticSpecies", () => getFantasticSpecies(db));
ipcMain.handle("getGroups", () => getGroups(db));
ipcMain.handle("getMarkov", () => getMarkov(db));

ipcMain.handle("initDatabase", () => initDatabase(db));
