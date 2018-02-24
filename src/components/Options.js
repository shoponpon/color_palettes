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
    const { smoothing, contrast, gamma } = props.image;

    return (
        <ul>
            {/*
            <li>
                <Checkbox className="options-checkbox" value={smoothing} onChange={(e) => imageAction.checkSmoothing(e.targetValue)}>輝度と対応づけて置換</Checkbox>
            </li>
            */}
            <li>
                <Checkbox className="options-checkbox" value={smoothing} onChange={(e) => imageAction.checkSmoothing(e.targetValue)}>ジャギーを抑える(平滑化)</Checkbox>
            </li>
            <li>
                <Checkbox className="options-checkbox" value={contrast} onChange={(e) => imageAction.checkContrast(e.targetValue)}>彩度を上げる(ハイコントラスト化)</Checkbox>
            </li>
            <li>
                <Checkbox className="options-checkbox" value={gamma} onChange={(e) => imageAction.checkGamma(e.targetValue)}>明るさを調整(ガンマ変換)</Checkbox>
            </li>
            <li>
                <Checkbox className="options-checkbox" value={smoothing} onChange={(e) => imageAction.checkSmoothing(e.targetValue)} disabled>グリッチ（バグ画像風）(近日実装)</Checkbox>
            </li>
        </ul>
    );
}

export default Options;