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
import SnsButtons from './SnsButtons';

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
    const { fetchColorPalettes, selectPaletteColorFromUrl } = this.state.imageAction;
    fetchColorPalettes();

    //set url colro palettes
    //http://localhost:3000/index.html?c[0]=rgb(255,255,255)&c[1]=rgb(20,255,25)&c[2]=rgb(25,0,25),
    const url = new URL(window.location.href);
    for(let i = 0;i<4;i++){
      const color = url.searchParams.get("c["+i+"]");
      if(color){
        //console.log(color);
        selectPaletteColorFromUrl(color,i)
      }
    }
  }

  render() {
    return (
      <div className="App">
        <NavigationBar />
        <div className="header">
          画像をドット風にして色を変えてレトロなゲーム風にできます。
          <div>現在，β版です．エラー・バグ報告は<a href="https://twitter.com/shopon1201" target="_blank">こちら</a>にリプライでいただけると喜びます．</div>
          <div className="line" />
          <div>更新履歴</div>
            <ul>
              <li>８色まで色を選択可能に。</li>
              <li>ディザモードを指定して少ない色でも多段階の階調表現が可能に。</li>
            </ul>
        </div>
        <ColorPalettes {...this.state} />
        <div className="two-column-view">
          <div className="two-column-view-left">
            <ImageView {...this.state} />
          </div>
          <div className="two-column-view-right">
            <FormView {...this.state} />
            <SnsButtons {...this.state} />
          </div>
        </div>
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
