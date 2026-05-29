function countQuery(INPUT: string[], QUERY: string[]) {
  return QUERY.map((q) => INPUT.filter((i) => i === q).length);
}
