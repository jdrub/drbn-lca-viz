import './App.css';
import TreeView from './Tree';
import { Button, Input, Form } from 'antd';
import styled from 'styled-components';
import { useState } from 'react';
import Node, { parseTreeString, deserializeBT, getLCA } from './models/Node';

const levelOrderRegex = /^\[(([0-9]|null)+[ ]*,[ ]*)*[0-9]+[ ]*\]$/;

interface CreateTreeInputValues {
  treeEncoding: string;
}

interface FindLcaInputValuse {
  node1: string;
  node2: string;
}

function App() {
  const [rootNode, setRootNode] = useState<Node|null>(null);
  const [lcaNode, setLcaNode] = useState<Node | null>(null);

  const handleCreateTree = ({ treeEncoding } : CreateTreeInputValues) => {
    const parsedStr = parseTreeString(treeEncoding);
    const treeRootNode = deserializeBT(parsedStr);
    setRootNode(treeRootNode);
  }

  const handleLcaSubmit = ({ node1, node2 }: FindLcaInputValuse) => {
    const lca = getLCA(rootNode, Number(node1), Number(node2));
    setLcaNode(lca);
  };

  return (
    <StyledApp>
      <InputColumn>
        <Form
          name="treeForm"
          onFinish={handleCreateTree}>
          <Input.Group compact>
            <StyledFormItem
              name="treeEncoding"
              rules={[
                {
                  required: true,
                  message: 'level-order tree traversal is required for viz'
                },
                {
                  pattern: levelOrderRegex,
                  message: 'format must be [Number|null, ..., Number|null]',
                }
              ]}>
                <Input placeholder='level-order encoded binary tree' />
              </StyledFormItem>
              <CreateTreeButton type="primary" htmlType="submit">Create Tree</CreateTreeButton>
          </Input.Group>
        </Form>
        <Break />
        <Form
          name="lcaForm"
          onFinish={handleLcaSubmit}>
          <Input.Group compact>
            <StyledFormItem
              name="node1"
              rules={[
                {
                  required: true,
                  message: 'must enter node value'
                },
                {
                  pattern: /^[0-9]+$/,
                  message: 'must be a number',
                }
              ]}>
                <Input placeholder='Node 1' />
              </StyledFormItem>
          </Input.Group>
          <Input.Group compact>
            <StyledFormItem
              name="node2"
              rules={[
                {
                  required: true,
                  message: 'must enter node value'
                },
                {
                  pattern: /^[0-9]+$/,
                  message: 'must be a number',
                }
              ]}>
                <Input placeholder='Node 2' />
              </StyledFormItem>
              
              <FindLcaButton type="primary" htmlType="submit">Find LCA</FindLcaButton>
          </Input.Group>
        </Form>
      </InputColumn>
      <TreeView tree={rootNode} lca={lcaNode}/>
    </StyledApp>
  );
}

const StyledApp = styled.div`
  display: grid;
  grid-template-columns: 20vw auto;
  column-gap: 10%;

  margin: 100px;
  border: solid 1px grey;
  min-height: calc(100vh - 200px);
  padding: 20px;
  border-radius: 20px;
`;

const StyledFormItem = styled(Form.Item)`
  width: 100%;
`;

const CreateTreeButton = styled(Button)`
  width: 100%;
`

const FindLcaButton = styled(Button)`
  width: 100%;
`;

const InputColumn = styled.div`
  grid-column: 1;
  grid-row: auto;
`;

const Break = styled.br`
  margin-top: 20px;
`;

export default App;
