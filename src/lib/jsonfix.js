export default function jsonFix(string) {
  return string
    .replace(/\\x93/g, "\u201C")
    .replace(/\\x94/g, "\u201D")
    .replace(/'/g, '"');
}
