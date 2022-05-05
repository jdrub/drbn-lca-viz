import './App.css';
import TreeView from './Tree';
import { Button, Input, Form } from 'antd';
import styled from 'styled-components';
import { useState } from 'react';
import Node, { parseTreeString, deserializeBT } from './models/Node';

const levelOrderRegex = /^\[(([0-9]|null)+,[ ]*)*[0-9]+\]$/;

interface InputValues {
  treeEncoding: string
}

function App() {
  const [rootNode, setRootNode] = useState<Node|null>(null);

  const handleCreateTree = ({ treeEncoding } : InputValues) => {
    const parsedStr = parseTreeString(treeEncoding);
    const treeRootNode = deserializeBT(parsedStr);
    setRootNode(treeRootNode);
  }

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
              <StyledButton type="primary" htmlType="submit">Create Tree</StyledButton>
          </Input.Group>
        </Form>
      </InputColumn>
      <TreeView tree={rootNode} />
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
  width: 70%;
`;

const StyledButton = styled(Button)`
  width: 30%;
`

const InputColumn = styled.div`
grid-column: 1;
grid-row: auto;
`;

export default App;
