import React, { Component } from 'react';
import {
    Tabs,
    Tab
} from 'react-bootstrap';

export default class ImageView extends Component {
    render() {

        const { inputImage, outputImage } = this.props.image;
        const { activeTabKey } = this.props.app;
        const { appAction } = this.props;

        return (
            <Tabs className="tabs" activeKey={activeTabKey} onSelect={(key)=>appAction.changeTab(key)}>
                <Tab className="tab" eventKey={1} title="変換前">
                    <div className="image-wrap" >
                        <img id="preview-image-tag" className="noSmoothing" src={inputImage} alt="変換前画像"/>
                    </div>
                </Tab>
                <Tab className="tab" eventKey={2} title="変換後">
                    <div className="image-wrap" >
                        {/*ToDo: ろーでぃんぐ画像に差し替え*/}
                        <img id="line-image-tag" className="noSmoothing" src={outputImage} alt="変換後画像"/>
                    </div>
                </Tab>
            </Tabs>
        );
    }
}