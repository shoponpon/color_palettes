import React, { Component } from 'react';
import './ColorPalettes.css';

import ColorPalette from './ColorPalette';

export default class ColorPalettes extends Component{
    constructor(props){
        super(props);
    }

    render(){

        const palettes = [
            ['#aabbcc','#00aa22','#aabbcc','#00aa22'],['#aabbcc','#00aa22','#aabbcc','#00aa22'],['#aabbcc','#00aa22','#aabbcc','#00aa22']
        ];

        return (
            <div className="color-palettes">
                <div className="line"/>
                {(()=>{
                    let list = [];
                    for(let i = 0;i<palettes.length;i++){
                        list.push(<ColorPalette colors={palettes[i]}/>)
                    }
                    return (list);
                })()}
                <div className="line"/>
                <div className="title">最近変換されたカラーパレット（クリックで反映）</div>
            </div>
        );
    }
}