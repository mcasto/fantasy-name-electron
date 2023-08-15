import chain from "./util/markov-chain-generator";
import isValid from "./util/is-valid";

const maxAttempts = 1000;

async function generateMarkov(db, config) {
  if (!config) return [];

  const { name, num } = config;

  const { values } = await db.findOne({ name });

  chain.refresh();
  chain.addWordsToChain(values);

  const results = [];
  let attempts = 0;
  while (results.length < num || attempts > maxAttempts) {
    attempts++;
    const result = chain.generateWord();

    if (!isValid(result, config)) continue;

    results.push(result);
  }

  return results;
}

export default generateMarkov;
