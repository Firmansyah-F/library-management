function longest(sentence: string) {
  const words = sentence.split(" ");
  let max = "";

  for (let w of words) {
    if (w.length > max.length) max = w;
  }

  return `${max}: ${max.length}`;
}
