import React, { Component } from 'react';
import './App.css';

//Stores
import AppStore from '../stores/AppStore';

//Components
import NavigationBar from './NavigationBar';
import ImageView from './ImageView';
import FormView from './FormView';

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
        <div className="header">
          イラストを減色してカラーパレットを変えるツールです。
        </div>
        <div className="two-column-view">
          <div className="two-column-view-left">
            <ImageView />
          </div>
          <div className="two-column-view-right">
            <FormView />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
