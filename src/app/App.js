import React, { Component } from 'react'
import { Provider } from 'react-redux'

import logo from './logo.svg'
import './App.css'


class App extends Component {
  render () {
    return <Provider store={this.props.store}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
        </p>
        {this.props.children}
      </div>
    </Provider>
  }
}

export default App
