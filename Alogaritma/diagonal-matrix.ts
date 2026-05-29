function diagonal(matrix: number[][]) {
  let d1 = 0;
  let d2 = 0;
  let n = matrix.length;

  for (let i = 0; i < n; i++) {
    d1 += matrix[i][i];
    d2 += matrix[i][n - i - 1];
  }

  return d1 - d2;
}
