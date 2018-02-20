import React, { Component } from 'react';
import {
    Tabs,
    Tab
} from 'react-bootstrap';
import './ImageView.css';

export default class ImageView extends Component {
    render() {

        const { inputImage, outputImage } = this.props.image;
        const { activeTabKey } = this.props.app;
        const { appAction } = this.props;

        return (
            <Tabs className="tabs" activeKey={activeTabKey} onSelect={(key)=>appAction.changeTab(key)}>
                <Tab className="tab" eventKey={1} title="変換前">
                    <div id="preview-image" >
                        <img id="preview-image-tag" className="noSmoothing" src={inputImage} alt="変換前"/>
                    </div>
                </Tab>
                <Tab className="tab" eventKey={2} title="変換後" actived>
                    <div id="line-image" >
                        <img id="line-image-tag" className="noSmoothing" src={outputImage} alt="変換前"/>
                    </div>
                </Tab>
            </Tabs>
        );
    }
}