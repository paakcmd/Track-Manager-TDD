import React, { Component } from 'react';
import { createTrack } from '../actions/track';
import { connect } from 'react-redux';

export class Track extends Component {
  display(track) {
    if (track.length > 0) {
      return track.map(trackLine => (
        <tr key={trackLine.time}>
          <td>{trackLine.time}</td>
          <td>{trackLine.event}</td>

        </tr>
      ));
    } else {
    }
  }
  render() {
    const track = this.props.track;
    console.log(track);
    return (
      <div>
        <input
          id="input"
          type="file"
          accept=".txt"
          onChange={e => this.props.createTrack(e.target.files[0])}
        />
        <table>
          <tbody>
            <tr>
              <th>Time</th>
              <th>Event</th>
            </tr>
            {this.display(track)}
          </tbody>
        </table>
      </div>
    );
  }
}

export default connect(
  state => {
    return { track: state };
  },
  { createTrack }
)(Track);
