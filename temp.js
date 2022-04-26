function add(a, b) {
  const A = a.split('').reverse().map(Number);
  const B = b.split('').reverse().map(Number);
  const O = [];
  let C = 0;
  let i = 0;
  while ( i < A.length && i < B.length) {
    const ad = A[i] + B[i] + C;
    if (ad < 10) {
      C = 0;
      O.push(ad);
    } else {
      C = 1;
      O.push(ad - 10);
    }
    i++;
  }
  if (i == A.length && i < B.length)
    O.push(...B.slice(i));
  if (i == B.length && i < A.length)
    O.push(...A.slice(i));
  while (C == 1 && i < O.length) {
    O[i] += C;
    if (O[i] == 10) O[i] = 0;
    else C = 0;
    i++;
  }
  if (C == 1) O.push(C);
  return O.reverse().join('');
}
