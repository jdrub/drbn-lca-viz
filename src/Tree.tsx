import Node from './models/Node';
import styled from 'styled-components';
import { getTreeDepth } from './models/Node';
import { ReactElement } from 'react';

type Props = {
  tree: Node | null;
};

const TreeView = (props: Props) => {

  const treeDepth = getTreeDepth(props.tree);
  const numColumns = Math.pow(2, treeDepth) - 1;

  const treeNodes = getTreeNodes(props.tree, numColumns, treeDepth);

  return (
    <Wrapper $numColumns={numColumns} $numRows={treeDepth}>
      {treeNodes}
    </Wrapper>
  );
};

const getTreeNodes = (tree: Node | null, numColumns: number, numLvls: number): (ReactElement|undefined)[] => {
  const treeNodes: ReactElement[] = [];

  // bfs (level-order) traversal
  if (tree === null) return [undefined];

  const nodeQueue: TreeNodeQueueEntry[] = [
    {
      node: tree,
      level: 1,
      column: Math.ceil(numColumns/2)
    }
  ];

  while (nodeQueue.length > 0)
  {
    const n = nodeQueue.shift()!;

    if (n.node !== null)
    {
      treeNodes.push((
        <TreeNode
          $column={n.column}
          $row={n.level}
        >
          <span>{n.node.value}</span>
        </TreeNode>
      ));
    }


    if (n.node === null) continue;

    const colIncr = getChildColumnIncrement(numLvls, n.level+1);
    const leftChildCol = n.column - colIncr;
    const rightChildCol = n.column + colIncr;
    
    nodeQueue.push({
      node: n.node.left,
      column: leftChildCol,
      level: n.level + 1
    });

    nodeQueue.push({
      node: n.node.right,
      column: rightChildCol,
      level: n.level + 1
    });
  }

  return treeNodes;
}

const getChildColumnIncrement = (totalLvls: number, nextLvl: number): number => {
  
    /*
    * 1 -> 16 = 2 ^ 4
    * 2 -> 8 = 2 ^ 3
    * 3 -> 4 = 2 ^ 2
    * 4 -> 2 = 2 ^ 1
    * 5 -> 1 = 2 ^ 0
    * 
    * nextLvl = lvl+1
    * incr = math.pow(2, totalLvls - nextLvl)
    */ 

    return Math.pow(2, totalLvls - nextLvl);
}

interface TreeNodeQueueEntry {
  node: Node | null,
  level: number,
  column: number
}

interface WrapperProps {
  readonly $numColumns: number,
  readonly $numRows: number
}

interface TreeNodeProps {
  $column: number,
  $row: number
}

const Wrapper = styled.div<WrapperProps>`
  display: grid;
  grid-template-columns: repeat(${p => p.$numColumns}, 1fr);
  grid-template-rows: repeat(${p => p.$numRows}, 1fr);

  row-gap: 10px;
  column-gap: 10px;
`;

const TreeNode = styled.div<TreeNodeProps>`
  grid-column: ${p => p.$column};
  grid-row: ${p => p.$row};

  position: relative;
  
  background-color: grey;
  color: white;
  border-radius: 50%;
  
  width: 100px;
  height: 100px;

  margin: auto;

  & > * {
    // center child
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export default TreeView;
