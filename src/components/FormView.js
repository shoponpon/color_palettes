import React, { Component } from 'react';
import {
    FormGroup,
    ControlLabel,
    FormControl,
    HelpBlock,
    Checkbox
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
        const { inputImage, palette, dotNumber, smoothing } = this.props.image;
        const { submitButtonState, validationErrorMessage } = this.props.app;
        
        return (
            <div id="forms" >
                <form className="form-view">
                    {(()=>{
                        if(validationErrorMessage){
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
                    <FormGroup controlId="formControlCheck">
                        <ControlLabel>平滑化</ControlLabel>
                        <Checkbox onChange={(e)=>imageAction.checkSmoothing(e.target.value)} style={{margin:0}}>
                        </Checkbox>
                        {"輪郭の荒さを低減します。" && <HelpBlock>輪郭の荒さを低減します。</HelpBlock>}
                    </FormGroup>
                    <div className="">
                        <ColorPicker color={palette[0]} onChange={imageAction.selectPaletteColor} pickerId={0}/>
                        <ColorPicker color={palette[1]} onChange={imageAction.selectPaletteColor} pickerId={1}/>
                        <ColorPicker color={palette[2]} onChange={imageAction.selectPaletteColor} pickerId={2}/>
                        <ColorPicker color={palette[3]} onChange={imageAction.selectPaletteColor} pickerId={3}/>
                    </div>
                    {"４つの色を選択してください。" && <HelpBlock>４つの色を選択してください。</HelpBlock>}
                </form>
                {(()=>{
                    if(submitButtonState){
                        return (
                            <div className="submitButton" onClick={()=>{}/*imageAction.fetchDotImage(inputImage,dotNumber,palette,smoothing)*/}>
                            変換
                            </div>
                        );    
                    }else{
                        return (
                            <div className="submitButton disable" >
                            変換中...
                            </div>
                        );    
                    }
                })()}
            </div>
        );
    }
}