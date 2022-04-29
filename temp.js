 map = new Map([
  ['I', 1], ['V', 5], ['X', 10],
  ['L', 50], ['C', 100], ['D', 500],
  ['M', 1000]
]);
let num = 0, pre = 0;
for (const c of 'MMVIII') {
  const v = map.get(c);
  if (pre < v) {
    num -= pre;
    num += v - pre;
  } else 
    num += v;
  pre = v;
  console.log(c, v);
  console.log(num, pre);
}
