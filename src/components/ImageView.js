import React, { Component } from 'react';
import {
    Tabs,
    Tab
} from 'react-bootstrap';
import './ImageView.css';

export default class ImageView extends Component {
    render() {
        return (
            <Tabs className="tabs">
                <Tab className="tab" eventKey={1} title="元絵">
                    <div id="preview-image" >
                        <img id="preview-image-tag" src="./please_input.png" />
                    </div>
                </Tab>
                <Tab className="tab" eventKey={2} title="線画">
                    <div id="line-image" >
                        <img id="line-image-tag" src="./please_input.png" />
                    </div>
                </Tab>
            </Tabs>
        );
    }
}