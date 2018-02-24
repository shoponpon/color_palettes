import React, { Component } from 'react';
import {
    SwatchesPicker
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
        const {  openedColorpicker } = this.props.app;
        const { pickerId, appAction } = this.props;

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
            }
        };

        return (
            <div style={styles.switch} onClick={() => {
                console.log(openedColorpicker);
                if(openedColorpicker===pickerId){
                    appAction.closeColorPicker();                
                }else{
                    appAction.openColorPicker(pickerId);
                }
            }}>
                <div style={styles.color} />
            </div>
        );
    }
}