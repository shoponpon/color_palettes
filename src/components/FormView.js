import React, { Component } from 'react';
import {
    FormGroup,
    ControlLabel,
    FormControl,
    HelpBlock,
} from 'react-bootstrap';
import './FormView.css'

import ColorPicker from './ColorPicker';

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

        const { imageAction } = this.props;
        const { inputImage, palette, dotNumber } = this.props.image;

        return (
            <div id="forms" >
                <form className="form-view">
                    <FieldGroup
                        id="formControlFile"
                        type="file"
                        label="File"
                        help="イラストを選択してください。"
                    />
                    <FormGroup controlId="formControlNumber">
                        <ControlLabel>ドットの大きさ</ControlLabel>
                        <FormControl componentClass="select" placeholder={dotNumber} onChange={(e)=>imageAction.selectDotNumber(e.target.value)}>
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
                    カラー１
                    <ColorPicker color={palette[0]} onChange={imageAction.selectPaletteColor} pickerId={0}/>
                    カラー２
                    <ColorPicker color={palette[1]} onChange={imageAction.selectPaletteColor} pickerId={1}/>
                    カラー３
                    <ColorPicker color={palette[2]} onChange={imageAction.selectPaletteColor} pickerId={2}/>
                    カラー４
                    <ColorPicker color={palette[3]} onChange={imageAction.selectPaletteColor} pickerId={3}/>
                    {"４つの色を選択してください。" && <HelpBlock>４つの色を選択してください。</HelpBlock>}
                </form>
                <div className="submitButton" onClick={()=>imageAction.fetchDotImage(inputImage,dotNumber,palette)}>
                    変換
                </div>
            </div>
        );
    }
}