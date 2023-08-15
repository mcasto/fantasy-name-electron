import { startCase } from "lodash";

function Node(char) {
  this.character = char;
  this.neighbors = [];
}

function TrieNode() {
  this.children = [];
}

let privateMethods = {
    addToDuplicatesTrie: function (word, duplicates) {
      if (word.length > 1) {
        privateMethods.addToDuplicatesTrie(word.substr(1), duplicates);
      }

      let currentNode = duplicates,
        i,
        childNode;

      for (i = 0; i < word.length; i += 1) {
        childNode = currentNode.children[word[i]];
        if (!childNode) {
          childNode = new TrieNode();
          currentNode.children[word[i]] = childNode;
        }
        currentNode = childNode;
      }
    },
    isDuplicate: function (word, duplicates) {
      word = word.toLowerCase();
      let currentNode = duplicates,
        i,
        childNode;

      for (i = 0; i < word.length; i += 1) {
        childNode = currentNode.children[word[i]];
        if (!childNode) {
          return false;
        }

        currentNode = childNode;
      }

      return true;
    },
  },
  order = 3,
  duplicates = new TrieNode(),
  start = new Node(""),
  map = {};

export default {
  refresh: function () {
    order = 3;
    duplicates = new TrieNode();
    start = new Node("");
    map = {};
  },

  setOrder: function (o) {
    order = o;
  },

  addWordsToChain: function (words) {
    let i;
    for (i = 0; i < words.length; i += 1) {
      this.addWordToChain(words[i]);
    }
  },

  addWordToChain: function (word) {
    privateMethods.addToDuplicatesTrie(word.toLowerCase(), duplicates);

    let previous = start,
      key = "",
      i,
      char,
      newNode;

    for (i = 0; i < word.length; i += 1) {
      char = word[i];
      key += char;
      if (key.length > order) {
        key = key.substr(1);
      }
      newNode = map[key];

      if (!newNode) {
        newNode = new Node(char);
        map[key] = newNode;
      }

      previous.neighbors.push(newNode);
      previous = newNode;
    }

    previous.neighbors.push(null);
  },

  generateWord: function (
    minLength = 4,
    maxLength = 11,
    startWith = "",
    endWith = "",
    contains = "",
    doesntContains = "",
    allowDuplicates = false,
    maxAttempts
  ) {
    if (typeof startWith === "undefined") {
      startWith = "";
    }
    if (typeof endWith === "undefined") {
      endWith = "";
    }
    if (
      typeof minLength === "undefined" ||
      minLength < startWith.length ||
      minLength < endWith.length
    ) {
      minLength =
        startWith.length > endWith.length ? startWith.length : endWith.length;
    }
    if (typeof allowDuplicates === "undefined") {
      allowDuplicates = false;
    }
    if (typeof maxLength === "undefined") {
      maxLength = -1;
    }
    if (typeof maxAttempts === "undefined") {
      maxAttempts = 100;
    }

    let word = "",
      repeat = true,
      attempts = 0,
      nextNodeIndex,
      currentNode;

    while (!word.length) {
      attempts += 1;
      if (attempts >= maxAttempts) {
        return;
      }

      nextNodeIndex = Math.floor(Math.random() * start.neighbors.length);
      currentNode = start.neighbors[nextNodeIndex];
      word = "";

      while (currentNode && (maxLength < 0 || word.length <= maxLength)) {
        word += currentNode.character;
        nextNodeIndex = Math.floor(
          Math.random() * currentNode.neighbors.length
        );
        currentNode = currentNode.neighbors[nextNodeIndex];
      }

      if (
        word.substr(0, startWith.length) !== startWith ||
        word.substr(word.length - endWith.length) !== endWith ||
        (typeof contains !== "undefined" && word.indexOf(contains) === -1) ||
        (typeof doesntContains !== "undefined" &&
          doesntContains.length > 0 &&
          word.indexOf(doesntContains) > -1) ||
        word.length > maxLength ||
        word.length < minLength ||
        (!allowDuplicates && privateMethods.isDuplicate(word, duplicates))
      ) {
        word = "";
      }
    }

    return startCase(word);
  },
};
