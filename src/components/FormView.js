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

    componentDidMount(){
        const { imageAction } = this.props;
        const inputFile = document.getElementById('formControlFile');
        inputFile.addEventListener('change',(e)=>{
            if(e.target.files.length != 1){
                return;
            }
            imageAction.selectImageFile(e.target.files[0]);
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