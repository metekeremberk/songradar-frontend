export default function jsonFix(string) {
  // First, fix the \x93 and \x94 issues
  string = string.replace(/\\x93/g, "\u201C").replace(/\\x94/g, "\u201D");

  // Next, handle incorrectly used single quotes around JSON strings
  // Assuming the JSON is an array or an object
  string = string.replace(/^'|\['|"{'|']|'}'$/g, (m) => m.replace(/'/g, '"'));

  // Finally, escape unescaped double quotes inside the string
  return string.replace(/(?<!\\)(?<!\[)"(?!])/g, '\\"');
}
