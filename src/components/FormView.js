import React, { Component } from 'react';
import {
    FormGroup,
    ControlLabel,
    FormControl,
    HelpBlock
} from 'react-bootstrap';
import './FormView.css'

function FieldGroup({ id, label, help, ...props }) {
    return (
        <div class="form-view">
            <FormGroup controlId={id}>
                <ControlLabel>{label}</ControlLabel>
                <FormControl {...props} />
                {help && <HelpBlock>{help}</HelpBlock>}
            </FormGroup>
        </div>
    );
}

export default class FormView extends Component{

    _showPreview(binary) {
        const preview = document.getElementById('preview-image-tag');
        preview.src = binary;
    }

    componentDidMount(){
        const inputFile = document.getElementById('formControlFile');
        inputFile.addEventListener('change',(e)=>{
            if(e.target.files.length != 1){
                return;
            }
            const reader = new FileReader();
            reader.onload = function (e) {
                this._showPreview(e.target.result);
            }.bind(this);
            reader.readAsDataURL(e.target.files[0]);
        });
    }

    render() {
        return (
            <div id="forms" >
                <form>
                    <FieldGroup
                        id="formControlFile"
                        type="file"
                        label="File"
                        help="イラストを選択してください。"
                    />
                </form>
                <div className="memo">
                    変換
                </div>
            </div>
        );
    }
}