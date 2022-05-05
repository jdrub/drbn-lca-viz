import './App.css';
import TreeView from './Tree';
import { Button, Input, Form } from 'antd';
import styled from 'styled-components';

const levelOrderRegex = /^\[(([0-9]|null)+,[ ]*)*[0-9]+\]$/;
function App() {
  return (
    <div className="App">
      <Form name="treeForm">
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
              <Input defaultValue="[3, 9, 7, 2, 6, null, 4]" />
            </StyledFormItem>
            <Button type="primary">Create Tree</Button>
        </Input.Group>
      </Form>
      <TreeView tree={null} />
    </div>
  );
}

const StyledFormItem = styled(Form.Item)`
  width: 400px;
`;

export default App;
