import React from 'react';

const SubmitButton = (props) => {

    const { imageAction } = props;
    const { submitButtonState } = props.app;
    const { inputImage, dotNumber, palette, smoothing, contrast, gamma } = props.image;

    if (submitButtonState) {
        return (
            <div className="submitButton" onClick={()=>imageAction.fetchDotImage(inputImage, dotNumber, palette, smoothing, contrast, gamma)}>
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