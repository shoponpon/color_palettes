import React from 'react';
import {
    FormGroup,
    ControlLabel,
    FormControl,
    HelpBlock,
    Checkbox
} from 'react-bootstrap';

const Options = (props) => {

    const { imageAction } = props;
    const { smoothing } = props.image;

    return(
        <div>
            <p>オプション</p>
            <ul>
                <li>
                    <Checkbox className="options-checkbox" value={smoothing} onChange={(e)=>imageAction.checkSmoothing(e.targetValue)}>輝度と対応づけて置換</Checkbox>
                </li>
                <li>
                    <Checkbox className="options-checkbox" value={smoothing} onChange={(e)=>imageAction.checkSmoothing(e.targetValue)}>平滑化</Checkbox>
                </li>
                <li>
                    <Checkbox className="options-checkbox" value={smoothing} onChange={(e)=>imageAction.checkSmoothing(e.targetValue)}>グリッチ（バグ画像風）</Checkbox>
                </li>
                <li>
                    <Checkbox className="options-checkbox" value={smoothing} onChange={(e)=>imageAction.checkSmoothing(e.targetValue)}>彩度を上げる</Checkbox>
                </li>
            </ul>
        </div>
    );
}

export default Options;