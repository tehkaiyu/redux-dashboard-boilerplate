import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

@connect(
  state => ({ user: state.user.user }),
)
export default class App extends Component {
  static propTypes = {
    user: PropTypes.object,
    children: PropTypes.object.isRequired,
  };

  static contextTypes = {
    store: PropTypes.object.isRequired,
    router: React.PropTypes.object.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      // login
      this.context.router.push('/');
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.context.router.push('/login');
    }
  }

  render() {
    return (
      this.props.children
    );
  }
}
