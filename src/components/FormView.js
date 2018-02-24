import React, { Component } from 'react';
import {
    FormGroup,
    ControlLabel,
    FormControl,
    HelpBlock,
    Checkbox,
    Tab,
    Tabs
} from 'react-bootstrap';
import {
    SwatchesPicker,
    SketchPicker
} from 'react-color';

import ColorPickers from './ColorPickers';
import ColorPicker from './ColorPicker';
import Options from './Options';
import SubmitButton from './SubmitButton';
import GradationColorPicker from './GradationColorPicker';

export default class FormView extends Component {

    componentDidMount() {
        const { imageAction } = this.props;
        const inputFile = document.getElementById('formControlFile');
        inputFile.addEventListener('change', (e) => {
            if (e.target.files.length != 1) {
                return;
            }
            imageAction.selectImageFile(e.target.files[0]);
        });
    }

    render() {

        const { imageAction, appAction } = this.props;
        const { inputImage, palette, dotNumber, smoothing } = this.props.image;
        const { validationErrorMessage, openedColorpicker } = this.props.app;

        return (
            <div id="forms" >
                <form className="form-view">
                    {(() => {
                        if (validationErrorMessage) {
                            return (
                                <div className="error-message">
                                    {validationErrorMessage}
                                </div>
                            );
                        }
                    })()}
                    <FormGroup controlId="formControlFile">
                        <ControlLabel>画像ファイル</ControlLabel>
                        <FormControl type="file" />
                    </FormGroup>
                    <FormGroup controlId="formControlNumber">
                        <ControlLabel>ドットの大きさ</ControlLabel>
                        <FormControl componentClass="select" placeholder={dotNumber} onChange={(e) => imageAction.selectDotNumber(e.target.value)}>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={8}>8</option>
                            <option value={10}>10</option>
                        </FormControl>
                    </FormGroup>
                    <ControlLabel>色の選択(４〜８色)</ControlLabel>
                    <div className="colorpickers">
                        {(() => {
                            let pickers = [];
                            for (let i = 0; i < 4; i++)pickers.push(<ColorPicker pickerId={i} {...this.props} />);
                            return pickers;
                        })()}
                        {(() => {
                            let pickers = [];
                            for (let i = 4; i < palette.length; i++)pickers.push(<ColorPicker pickerId={i} {...this.props} />);
                            return pickers;
                        })()}
                    </div>
                    <div className="colorpickers">
                        <div className="colorpicker-button" onClick={imageAction.addPaletteColor} >＋</div>
                        <div className="colorpicker-button" onClick={imageAction.removePaletteColor} >ー</div>
                    </div>
                    <Tabs>
                        <Tab eventKey={0} title="グラデーションから選択" >
                            <GradationColorPicker {...this.props} />
                        </Tab>
                        <Tab eventKey={1} title="ランダムに色を選択" >
                            <ColorPickers {...this.props} />
                        </Tab>
                    </Tabs>
                    <ControlLabel>オプション</ControlLabel>
                    <Options {...this.props} />
                </form>
                <SubmitButton {...this.props} />
            </div>
        );
    }
}