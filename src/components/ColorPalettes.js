import React, { Component } from 'react';
import './ColorPalettes.css';

import ColorPalette from './ColorPalette';

export default class ColorPalettes extends Component {
    constructor(props) {
        super(props);
    }

    render() {
       
        const { palettes } = this.props.image;
        const { setPaletteColors } = this.props.imageAction;
        
        return (
            <div>
                <div className="title">最近使われたカラーパレット（クリックで反映）</div>
                <div className="color-palettes">
                    {(() => {
                        let list = [];
                        for (let i = 0; i < palettes.length; i++) {
                            list.push(<ColorPalette className="color-palette" colors={palettes[i].colors} onClickHanlder={()=>setPaletteColors(palettes[i].colors)}/>)
                        }
                        return (list);
                    })()}
                    <div className="line" />
                </div>
            </div>
        );
    }
}