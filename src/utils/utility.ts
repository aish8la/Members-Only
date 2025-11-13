export const snakeCaseToCamelCase = (text: string) => {
  return text
    .split("_")
    .map((word, index) => {
      if (index === 0) return word.toLowerCase();
      if (word[0]) {
        return word[0].toUpperCase() + word.slice(1).toLowerCase();
      }
    })
    .join("");
};
