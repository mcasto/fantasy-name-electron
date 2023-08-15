export default async (db) => {
  return await db
    .find({ table: "markov" }, { title: 1, name: 1 })
    .sort({ name: 1 });
};
