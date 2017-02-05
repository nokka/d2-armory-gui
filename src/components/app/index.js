import React, { Component } from 'react';
import './style.css';

class App extends Component {
  render() {
    return (
        <div className="app">
          {this.props.children}
        </div>
    );
  }
}

export default App;
