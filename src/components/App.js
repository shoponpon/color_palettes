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
    //fetch color palettes
    const { fetchColorPalettes, selectPaletteColorByCssString } = this.state.imageAction;
    fetchColorPalettes();

    //set url colro palettes
    //http://localhost:3000/index.html?c[0]=rgb(255,255,255)&c[1]=rgb(20,255,25)&c[2]=rgb(25,0,25),
    const url = new URL(window.location.href);
    for(let i = 0;i<4;i++){
      const color = url.searchParams.get("c["+i+"]");
      if(color){
        selectPaletteColorByCssString(color,i);
      }
    }
  }

  render() {

    const { palette } = this.state.image;
    let query = "?";
    for(let i = 0;i<palette.length;i++){
      query += "c["+i+"]="+palette[i]+"&";
    }

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
              <div>使った色をつぶやく</div>
              <a href="https://twitter.com/intent/tweet?button_hashtag=カラーパレットこんばーた&ref_src=twsrc%5Etfw" class="twitter-hashtag-button" data-size="large" data-text={"使ったカラーパレット http://colorpalette-converter.s3-website.us-east-2.amazonaws.com/index.html"+query} data-show-count="false">Tweet #button</a>
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
