export function hasDuplicates(array) {
  return new Set(array).size !== array.length;
}
