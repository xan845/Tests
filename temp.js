function sumPairs(ints, s) {
  let a, d = ints.length + 1;
  for (i = 0; i < ints.length; i++) {
    const ds = s - ints[i];
    for (j = i + 1; j < ints.length; j++) {
      const ji = j-i;
      if ((ds == ints[j]) &&(d > ji)) {
         a = [ints[i], ints[j]];
         d = ji;
      }
    }
  }
  return a;
}
