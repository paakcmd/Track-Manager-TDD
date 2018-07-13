import React, { Component } from 'react';
import { Input } from './Input';

class App extends Component {
  handleChange(selectorFiles: FileList)
    {
        console.log(selectorFiles);
    }
    
  render() {
    return (
      <div>
        <Input type="file" onChange={ (e) => this.handleChange(e.target.files) }/>
      </div>
    )
  }
}

export default App
