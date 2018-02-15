import React, { Component } from 'react';
import './App.css';

//Stores
import AppStore from '../stores/AppStore';
import ImageStore from '../stores/ImageStore';

//Actions
import ImageAction from '../actions/ImageAction';

//Components
import NavigationBar from './NavigationBar';
import ImageView from './ImageView';
import FormView from './FormView';

class App extends Component {

  static getStores(){
    return [
      AppStore,
      ImageStore
    ];
  }

  static calculateState(){
    return {
      app: AppStore.getState(),
      image: ImageStore.getState(),
      
      imageAction: ImageAction
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
            <ImageView {...this.state} />
          </div>
          <div className="two-column-view-right">
            <FormView {...this.state} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
