import React, { Component } from 'react';
import {
    Tabs,
    Tab
} from 'react-bootstrap';
import './ImageView.css';

export default class ImageView extends Component {
    render() {

        const { image } = this.props;

        return (
            <Tabs className="tabs">
                <Tab className="tab" eventKey={1} title="変換前">
                    <div id="preview-image" >
                        <img id="preview-image-tag" src={image.inputImage} />
                    </div>
                </Tab>
                <Tab className="tab" eventKey={2} title="変換後">
                    <div id="line-image" >
                        <img id="line-image-tag" src={image.inputImage} />
                    </div>
                </Tab>
            </Tabs>
        );
    }
}