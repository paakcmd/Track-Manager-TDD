import React, { Component } from 'react';

export class Input extends Component{
  changeHandler(file) {
    var reader = new FileReader();
    reader.onload = function(progressEvent){
      console.log(this.result);
    };
    reader.readAsText(file);
  }

  render(){
    return (
      <input type="file" accept='.txt' onChange={(e) => this.changeHandler(e.target.files[0])}/>
    )
  }

}
