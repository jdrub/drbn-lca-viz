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

export const getTreeDepth = (node : Node | null): number => {
  if (node === null) return 0;

  return 1 + Math.max(getTreeDepth(node.left), getTreeDepth(node.right));
}

export const getLCA = (node: Node | null, val1: number, val2: number): (number | null) => {
  const lcaDto = findLca(node, val1, val2);

  return lcaDto?.lca || null;
}

interface LcaDto {
  lca: number | undefined,
  foundOneVal: boolean,
}

const findLca = (currNode: Node | null, val1: number, val2: number): LcaDto | null => {
  if (currNode === null) {
    return null;
  }

  const leftSearch = findLca(currNode.left, val1, val2);
  const rightSearch = findLca(currNode.right, val1, val2);

  if (leftSearch?.lca !== undefined) {
    return leftSearch;
  }
  if (rightSearch?.lca !== undefined) {
    return rightSearch;
  }

  // if current node is lca
  if (
    (leftSearch?.foundOneVal && rightSearch?.foundOneVal) ||
    (leftSearch?.foundOneVal && (currNode.value === val1 || currNode.value == val2)) ||
    (rightSearch?.foundOneVal && (currNode.value === val1 || currNode.value == val2))
  ) {
    // curr node is lca
    return {
      lca: currNode.value,
      foundOneVal: true, // doesn't matter
    };
  }

  if (currNode.value === val1 || currNode.value === val2) {
    return {
      lca: undefined,
      foundOneVal: true
    };
  }

  return {
    lca: rightSearch?.lca || leftSearch?.lca,
    foundOneVal: leftSearch?.foundOneVal || rightSearch?.foundOneVal || false,
  };
}


