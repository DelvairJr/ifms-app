import React, { Component } from 'react'

export default class HorarioDeAula extends Component {
    constructor(props){
        super(props)
        this.state ={
            horarioDeAula: [],
            key: null,
            search: ''
        }
    }
  
    render() {
    return (
      <div className="upload">
        <progress value="0" max="100" id="uploader">0%</progress>
        <input type="file" value="upload" id="fileButton" /> 
      </div>
    )
  }
}
