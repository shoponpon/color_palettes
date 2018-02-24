import React, { Component } from 'react';
import ColorPicker from './ColorPicker';
import './ColorPickers.css'
import {
  SketchPicker
} from 'react-color';

export default class GradationColorPicker extends Component {
  render() {

    const { imageAction } = this.props;
    const { openedColorpicker } = this.props.app;
    const { palette } = this.props.image;

    return (
      <div>
        <p>色１と色２の間のグラデーションを作成します。</p>
        <p>色１</p>
        <ColorPicker pickerId={0} {...this.props} />
        <p>色２</p>
        <ColorPicker pickerId={palette.length - 1} {...this.props} />
        <div className="colorpicker-text-button" onClick={() => imageAction.setGradationColors(palette[0], palette[palette.length - 1], palette.length)}>グラデーションを作る</div>
        <div className="line" />
        <p>選択されている色</p>
        {(() => {
          let pickers = [];
          for (let i = 0; i < palette.length; i++)pickers.push(<ColorPicker pickerId={i} {...this.props} />);
          return pickers;
        })()}
        <div className="colorpicker">
          {(() => {
            if (openedColorpicker != -1) {
              return (
                <SketchPicker color={palette[openedColorpicker]} onChange={(color) => imageAction.selectPaletteColor(color.rgb, openedColorpicker)} height="100%" width="100%" />
              );
            }
          })()}
        </div>
      </div>
    )
  }
}