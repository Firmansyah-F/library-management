function reverse(str: string) {
  const letters = str.slice(0, -1).split("").reverse().join("");
  const number = str.slice(-1);
  return letters + number;
}

console.log(reverse("NEGIE1"));
