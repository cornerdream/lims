import React ,{Component} from 'react'
import { Tabs } from 'antd';
import Time from '../core/timeline';
const { TabPane } = Tabs;

const initialPanes = [
  { title: 'Tab 1', content: 'Content of Tab 1', key: '1' },
  { title: 'Tab 2', content: 'Content of Tab 2', key: '2' },
  {
    title: 'Tab 3',
    content: 'Content of Tab 3',
    key: '3',
    closable: false,
  },
];

class Experiment extends Component {
  newTabIndex = 0;

  state = {
    activeKey: initialPanes[0].key,
    panes: initialPanes,
  };

  onChange = activeKey => {
    this.setState({ activeKey });
  };



  render() {
    const { panes, activeKey } = this.state;
    return (
      <Tabs
        type="card"
        onChange={this.onChange}
        activeKey={activeKey}
        onEdit={this.onEdit}
      >
        {panes.map(pane => (
          <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
            {pane.key==1?<Time></Time>:pane.content}
          </TabPane>
        ))}
      </Tabs>
    );
  }
}

export default Experiment;