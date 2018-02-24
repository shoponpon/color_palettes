import React from 'react';
import './ColorPickers.css';
import {
    SwatchesPicker
} from 'react-color';

import ColorPicker from './ColorPicker';

const ColorPickers = (props) => {

    const { imageAction } = props;
    const { palette } = props.image;
    const { openedColorpicker } = props.app;

    return (
        <div>
            <div className="colorpickers">
                {(() => {
                    let pickers = [];
                    for (let i = 0; i < 4; i++)pickers.push(<ColorPicker pickerId={i} {...props} />);
                    return pickers;
                })()}
            </div>
            {
                (() => {
                    //additional colors
                    if (palette.length >= 5) {
                        let pickers = [];
                        for (let i = 4; i < 8; i++)pickers.push(<ColorPicker pickerId={i} {...props} />);
                        return pickers;
                    }
                })()
            }
            <div className="colorpicker">
                {(() => {
                    if (openedColorpicker != -1) {
                        return (
                            <SwatchesPicker color={palette[openedColorpicker]} onChange={(color) => imageAction.selectPaletteColor(color.rgb, openedColorpicker)} height="100%" width="100%" />
                        );
                    }
                })()}
            </div>
            <div className="colorpickers">
                <button className="colorpicker-button">＋</button>
                <button className="colorpicker-button">ー</button>
                <button className="colorpicker-text-button">ランダム</button>
            </div>
        </div>
    );
} 

export default ColorPickers;