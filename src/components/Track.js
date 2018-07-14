import React, { Component } from 'react';
import { createTrack } from '../actions/track';
import { connect } from 'react-redux';

export class Track extends Component {
  render() {
    console.log(this.props)
    return (
      <div>
        <input
          id="input"
          type="file"
          accept=".txt"
          onChange={e => this.props.createTrack(e.target.files[0])}
        />
      </div>
    );
  }
}

export default connect(
  state => { return { track: state } },
  { createTrack }
)(Track);
