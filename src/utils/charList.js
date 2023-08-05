const upperCharList = [];
const lowerCharList = [];
const numCharList = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const specialCharList = [
  "~",
  "`",
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "-",
  "_",
  "+",
  "=",
  "{",
  "}",
  "[",
  "]",
  "|",
  "\\",
  "/",
  ":",
  ";",
  '"',
  `'`,
  "<",
  ">",
  ",",
  ".",
  "?",
  " ",
];

for (let i = 0; i < 26; i++) {
  upperCharList.push(String.fromCharCode(i + 65));
  lowerCharList.push(String.fromCharCode(i + 97));
}

export { upperCharList, lowerCharList, numCharList, specialCharList };
