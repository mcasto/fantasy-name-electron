import { startsWith, endsWith } from "lodash";

export default (result, config) => {
  const {
    startsWithString,
    endsWithString,
    doesContain,
    doesNotContain,
    minLength,
    maxLength,
  } = config;

  if (!!startsWithString && !startsWith(result, startsWithString)) return false;
  if (!!endsWithString && endsWith(result, endsWithString)) return false;
  if (!!doesContain && !result.contains(doesContain)) return false;
  if (!!doesNotContain && result.contains(doesNotContain)) return false;
  if (!!minLength && result.length < minLength) return false;
  if (!!maxLength && result.length > maxLength) return false;

  return true;
};
