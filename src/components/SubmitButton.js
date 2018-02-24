import React from 'react';

const SubmitButton = (props) => {

    const { submitButtonState } = props.app;

    if (submitButtonState) {
        return (
            <div className="submitButton" onClick={() => { }/*imageAction.fetchDotImage(inputImage, dotNumber, palette, smoothing)*/}>
                変換
                </div>
        );
    } else {
        return (
            <div className="submitButton disable" >
                変換中...
                </div>
        );
    }
}

export default SubmitButton;