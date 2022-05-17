function treeByLevels (root) {
  const f = [];
  const q = [];
  if (root) {
    q.push(root);
    while (q.length) {
      magic(q, f);
    }
  }
  return f;
}

function magic(q, f) {
  const node = q.shift();
  f.push(node.value);
  if (node.left) q.push(node.left);
  if (node.right) q.push(node.right);
}
