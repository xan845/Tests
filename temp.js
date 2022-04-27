function sumPairs(ints, s) {
  let a;
  for (i = 0; i < ints.length; i++) {
    for (j = i + 1; j < ints.length; j++) {
      if (ints[i] + ints[j] == s) {
       if (!a || a[1]-a[0] > j-i) a = [i, j]

      }
    }
  }
  return a ? [ints[a[0]], ints[a[1]]] : a;
}
