import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import actions from '../actions/actions';

class App extends React.PureComponent {
  render() {
    let that = this,
      props = that.props;

    return (
      <div className={!client.preview ? 'app' : 'none'}>
        Hello Max!
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  state: state
});
const mapDispatchToProps = dispatch => ({
  appActions: bindActionCreators(actions, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(App);