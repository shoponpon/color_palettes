import React, { Component } from 'react';
import './App.css';

//Stores
import AppStore from '../stores/AppStore';

//Components
import NavigationBar from './NavigationBar';

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
        <NavigationBar />
        aaa
      </div>
    );
  }
}

export default App;
