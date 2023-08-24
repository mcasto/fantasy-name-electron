const { sample, flatten, fill, isArray, isObject } = require("lodash");

module.exports = (items) => {
  const item = sample(
    flatten(
      items.map((item) => {
        return isObject(item) && !isArray(item)
          ? fill(Array(item.count), item.value)
          : item;
      })
    )
  );

  return isArray(item) ? getSample(item) : item;
};
