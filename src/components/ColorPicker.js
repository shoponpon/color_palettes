import React, { Component } from 'react';
import {
    SketchPicker
} from 'react-color';

export default class ColorPicker extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
        }
    }

    _handleClickPicker = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    _handleClosePicker = () => {
        this.setState({
            isOpen: false
        });
    }

    render() {

        const { palette } = this.props.image;
        const { openedColorpicker } = this.props.app;
        const { pickerId, appAction, imageAction } = this.props;

        const styles = {
            color: {
                backgroundColor: palette[pickerId],
                width: 36,
                height: 36,
                borderRadius: '50%'
            },
            switch: {
                padding: 5,
                margin: 3,
                backgroundColor: '#fff',
                borderRadius: '50%',
                boxShadow: '0 0 0 1 rgba(0,0,0,.1)',
                display: 'inline-block',
                cursor: 'pointer'
            },
            popover: {
                position: window.innerWidth >= 768 ? 'absolute':'static',
                zIndex: '2'
            },
            cover: {
                position: 'fixed',
                top: '0px',
                right: '0px',
                bottom: '0px',
                left: '0px'
            }
        };

        return (
            <div>
                <div style={styles.switch} onClick={() => {
                    this._handleClickPicker();
                }}>
                    <div style={styles.color} />
                </div>
                {this.state.isOpen?
                <div style={styles.popover}>
                    <div style={styles.cover} onClick={this._handleClosePicker} />
                    <SketchPicker color={palette[pickerId]} onChange={(color)=>imageAction.selectPaletteColor(color.rgb, pickerId)} />
                </div> : null}
            </div>
        );
    }
}