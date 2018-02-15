import React, { Component } from 'react';
import {
    SwatchesPicker
} from 'react-color';

export default class ColorPicker extends Component{

    constructor(props){
        super(props);
        this.state = {
            isOpen: false,
            color: {
                r:0,
                g:0,
                b:0
            }
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

    _handleColorChange = (color) => {
        this.setState({
            color: color.rgb
        });
    }

    render(){
        console.log(this.state.color);

        const {r,g,b} = this.state.color;

        const styles = {
            color: {
                backgroundColor: 'rgb('+r+','+g+','+b+')',
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
                position: 'aboslute',
                zIndex: 2
            },
            cover: {
                position: 'fixed',
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
                            <SwatchesPicker color={this.state.color} onChange={this._handleColorChange} height={550}/>
                        </div>
                    </div>
                    :null
                }
            </div>
        );
    }
}