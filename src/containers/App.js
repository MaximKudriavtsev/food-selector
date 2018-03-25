import * as React from 'react';
import { minimalChain, isFinishChain, getChainLength, getMinimalChain } from './../../server/routing-problems';

class App extends React.PureComponent {
  render() {
    return (
      <div style={{ color: 'red' }} onClick={() => getMinimalChain([0, 1, -1], [0], 28)} >
        Hello Max!!!
      </div>
    );
  }
}

export default App;