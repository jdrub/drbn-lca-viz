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
    <div className="App">
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
              <Input defaultValue={"[3, 9, 7, 2, 6, null, 4]"} />
            </StyledFormItem>
            <Button type="primary" htmlType="submit">Create Tree</Button>
        </Input.Group>
      </Form>
      <TreeView tree={rootNode} />
    </div>
  );
}

const StyledFormItem = styled(Form.Item)`
  width: 400px;
`;

export default App;
