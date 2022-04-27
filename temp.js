function loop_size(node){
  const buff = [];
  let ptr;
  for (ptr = node; !buff.includes(ptr); ptr = ptr.next)
    buff.push(ptr);
  return buff.length - buff.indexOf(ptr);
}
