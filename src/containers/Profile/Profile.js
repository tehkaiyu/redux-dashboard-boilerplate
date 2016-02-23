import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { updateProfile } from 'redux/modules/delivery/deliveries.module.js';

@connect(
  state => ({ user: state.user.user }),
  { updateProfile }
)
export default class Profile extends Component {
  static propTypes = {
    user: PropTypes.object
  };

  render() {
    return (
      <section>
        <h1>Profile</h1>
      </section>
    );
  }
}
