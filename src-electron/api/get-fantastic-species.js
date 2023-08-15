export default async (db) => {
  return await db
    .find({ table: "species", name: { $exists: true } })
    .sort({ name: 1 });
};
