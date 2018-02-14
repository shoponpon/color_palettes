import React, { Component } from 'react';
import './App.css';

//Stores
import AppStore from '../stores/AppStore';

class App extends Component {

  static getStores(){
    return [AppStore];
  }

  static calculateState(){
    return {
      app: AppStore.getState()
    };
  }

  render() {
    return (
      <div className="App">
        aaa
      </div>
    );
  }
}

export default App;
