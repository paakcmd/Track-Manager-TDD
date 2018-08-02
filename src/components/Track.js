import React, { Component } from 'react';
import { createTrack, changeCurrentTrack } from '../actions/track';
import { connect } from 'react-redux';

export class Track extends Component {
  display(track, currentTrack) {
    if (track) {
      if (track.length > 0) {
        return track[currentTrack].map(trackLine => (
          <tr key={trackLine.time}>
            <td>{trackLine.time}</td>
            <td>{trackLine.event}</td>
          </tr>
        ));
      } else {
        return (
          <tr id="emptyList">
            <td>Empty</td>
            <td>Empty</td>
          </tr>
        );
      }
    }
  }
  render() {
    const track = this.props.track;
    const {
      display,
      currentTrack
    } = track;
    console.log(display)
    return (
      <div>
        <input
          className="inputFile"
          name="file"
          id="file"
          type="file"
          accept=".txt"
          onChange={e => this.props.createTrack(e.target.files[0])}
        />
        <label htmlFor="file">Choose a file</label>
        <table>
          <tbody>
            <tr>
              <th>Time</th>
              <th>Event</th>
            </tr>
            {this.display(display, currentTrack)}
          </tbody>
        </table>
        <h3>
          {display.length > 0 ? `${currentTrack + 1}/${display.length}` : ''}
        </h3>
        <button
          onClick={() =>
            currentTrack > 0
              ? this.props.changeCurrentTrack(
                  currentTrack - 1,
                )
              : ''
          }
        >
          back
        </button>
        <button
          onClick={() =>
            currentTrack < display.length-1
              ? this.props.changeCurrentTrack(
                  currentTrack + 1
                )
              : ''
          }
        >
          next
        </button>
      </div>
    );
  }
}

export default connect(
  state => {
    return { track: state };
  },
  { createTrack, changeCurrentTrack }
)(Track);
