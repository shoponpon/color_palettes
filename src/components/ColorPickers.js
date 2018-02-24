import React from 'react';

const ColorPickers = (props) => {

    const { imageAction } = props;

    return (
        <div>
            <div className="colorpickers">
                <div className="colorpicker-text-button" onClick={imageAction.setRandomColors}>色を選択</div>
            </div>
        </div>
    );
} 

export default ColorPickers;