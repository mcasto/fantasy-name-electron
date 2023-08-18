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

  if (
    !!startsWithString &&
    !startsWith(result.toLowerCase(), startsWithString.toLowerCase())
  )
    return false;

  if (
    !!endsWithString &&
    !endsWith(result.toLowerCase(), endsWithString.toLowerCase())
  )
    return false;

  if (
    !!doesContain &&
    !result.toLowerCase().contains(doesContain.toLowerCase())
  )
    return false;
  if (
    !!doesNotContain &&
    result.toLowerCase().contains(doesNotContain.toLowerCase())
  )
    return false;

  if (!!minLength && result.length < minLength) return false;

  if (!!maxLength && result.length > maxLength) return false;

  return true;
};
