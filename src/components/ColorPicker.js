import React, { Component } from 'react';
import {
    SwatchesPicker
} from 'react-color';

export default class ColorPicker extends Component{

    constructor(props){
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

    render(){

        const { color,onChange,pickerId } = this.props;

        const styles = {
            color: {
                backgroundColor: color,
                width: 36,
                height: 14,
                borderRadius: 2
            },
            switch: {
                padding: 5,
                backgroundColor: '#fff',
                borderRadius: 1,
                boxShadow: '0 0 0 1 rgba(0,0,0,.1)',
                display: 'inline-block',
                cursor: 'pointer'
            },
            popover: {
                /*position: 'absolute',
                zIndex: 2*/
            },
            cover: {
                /*position: 'fixed',
                margin: '0 auto'*/
            }
        };

        return(
            <div>
                <div style={styles.switch} onClick={this._handleClickPicker}>
                    <div style={styles.color}/>
                </div>
                {
                    this.state.isOpen ? 
                    <div style={styles.popover}>
                        <div style={styles.cover} onClick={this._handleClosePicker}>
                            <SwatchesPicker color={this.state.color} onChange={(color)=>onChange(color.rgb,pickerId)} height="100%" width="100%"/>
                        </div>
                    </div>
                    :null
                }
            </div>
        );
    }
}