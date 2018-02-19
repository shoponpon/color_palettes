import React, { Component } from 'react';
import './App.css';

//Stores
import AppStore from '../stores/AppStore';
import ImageStore from '../stores/ImageStore';

//Actions
import ImageAction from '../actions/ImageAction';
import AppAction from '../actions/AppAction';

//Components
import NavigationBar from './NavigationBar';
import ImageView from './ImageView';
import FormView from './FormView';
import ColorPalettes from './ColorPalettes';
import TwitterTimeLine from './TwitterTimeLine';

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
      
      imageAction: ImageAction,
      appAction: AppAction
    };
  }

  componentWillMount(){
    const { fetchColorPalettes } = this.state.imageAction;
    fetchColorPalettes();
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
            <div className="share-buttons">
              <a href="https://twitter.com/intent/tweet?button_hashtag=カラーパレットこんばーた&ref_src=twsrc%5Etfw" class="twitter-hashtag-button" data-size="large" data-text="カラーパレットこんばーた http://colorpalette-converter.s3-website.us-east-2.amazonaws.com/" data-show-count="false">Tweet #button</a>
            </div>
          </div>
        </div>
        <ColorPalettes {...this.state} />
        <div className="two-column-view">
          <div className="two-column-view-left">
            <TwitterTimeLine />
          </div>
          <div className="two-column-view-right">
          </div>
        </div>
      </div>
    );
  }
}

export default App;
