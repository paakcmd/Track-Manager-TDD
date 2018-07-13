import React, { Component } from 'react';
import { createTrack } from '../actions/track';
import { connect } from 'react-redux';

export class Track extends Component {
  render() {
    return (
      <div>
        <input
          id="input"
          type="file"
          accept=".txt"
          onChange={e => this.props.createTrack(e.target.files[0])}
        />
        {this.props.track}
      </div>
    );
  }
}

export default connect(
  null,
  { createTrack }
)(Track);
