import React, { Component } from 'react';
import ColorPicker from './ColorPicker';

export default class GradationColorPicker extends Component {
  render() {

    const { imageAction } = this.props;
    const { openedColorpicker } = this.props.app;
    const { palette } = this.props.image;

    return (
      <div>
        <div className="two-column-view">
          <div className="two-column-view-item">
            <ColorPicker pickerId={0} {...this.props} />
          </div>
          <div className="two-column-view-item">
          {"………………………"}
          </div>
          <div className="two-column-view-item">
            <ColorPicker pickerId={palette.length - 1} {...this.props} />
          </div>
        </div>
        <div className="colorpicker-text-button" onClick={() => imageAction.setGradationColors(palette[0], palette[palette.length - 1], palette.length)}>グラデーションを作る</div>
      </div>
    )
  }
}