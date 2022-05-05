export const parseTreeString = (str: string): (number | null)[] => {
  const noWhitespace = str.replace(/\s+/g, '');
  const noBraces = noWhitespace.slice(1, -1);
  const numOrNullArr = noBraces.split(',');

  const typedArr: (number | null)[] =
    numOrNullArr.map(val => val === 'null'
      ? null
      : Number(val));

  return typedArr;
}

export const deserializeBT = (arr: (number | null)[]): Node | null => {
  if (!arr.length || arr[0] == null) {
    return null;
  }

  const stack: Node[] = [];
  const root = new Node(arr.shift()!);
  stack.push(root);
  while (stack.length && arr.length) {
    const node = stack.shift();
    if (!node) {
      return root;
    }

    const lVal = arr.shift();
    const rVal = arr.shift();

    node.left = lVal ? new Node(lVal) : null;
    node.right = rVal ? new Node(rVal) : null;

    node.left && stack.push(node.left);
    node.right && stack.push(node.right);
  }

  return root;
};

export default class Node {
  public value: number;
  public left: Node | null = null;
  public right: Node | null = null;

  constructor(val: number) {
    this.value = val;
  }
}
