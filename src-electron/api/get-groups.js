export default async (db) => {
  return await db
    .find({ table: "groups" }, { name: 1, group: 1 })
    .sort({ name: 1 });
};
