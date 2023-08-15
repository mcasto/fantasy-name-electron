import defaultData from "../api/assets/default-data.json";

export default async (db) => {
  const dictionariesExist = (await db.count({})) > 0;
  if (!dictionariesExist) {
    await db.insertMany(defaultData);
  }
};
