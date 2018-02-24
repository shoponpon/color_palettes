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
import './FormView.css'
import {
    SwatchesPicker
} from 'react-color';

import ColorPickers from './ColorPickers';
import Options from './Options';
import SubmitButton from './SubmitButton';
import GradationColorPicker from './GradationColorPicker';

function FieldGroup({ id, label, help, ...props }) {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
            {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
}

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

        const { imageAction,appAction } = this.props;
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
                    <FieldGroup
                        id="formControlFile"
                        type="file"
                        label="File"
                        help="4MB以下のjpgまたはpngを選択してください。"
                    />
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
                        {"ドットの大きさを選択してください。" && <HelpBlock>ドットの大きさを選択してください。</HelpBlock>}
                    </FormGroup>
                    <Tabs>
                        <Tab eventKey={0} title="任意の色から選択" >
                            <ColorPickers {...this.props} />
                        </Tab>
                        <Tab eventKey={1} title="グラデーションから選択" >
                            <GradationColorPicker {...this.props} />
                        </Tab>
                    </Tabs>
                    <Options {...this.props} />
                </form>
                <SubmitButton {...this.props} />
            </div>
        );
    }
}