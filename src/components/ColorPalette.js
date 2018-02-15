import React, { Component } from 'react';

export default class ColorPalette extends Component{
    constructor(props){
        super(props);
    }

    render(){

        const { colors } = this.props;

        const styles = {
            color1:{
                backgroundColor: colors[0],
                height: 75,
                width: 30
            },
            color2:{
                backgroundColor: colors[1],
                height: 75,
                width: 30
            },
            color3:{
                backgroundColor: colors[2],
                height: 75,
                width: 30
            },
            color4:{
                backgroundColor: colors[3],
                height: 75,
                width: 30
            },
            colors: {
                display: 'flex',
                borderRadius: 5,
                overflow: 'hidden'
            },
            frame: {
                margin:10,
                padding: 10,
                backgroundColor: '#fff',
                borderRadius: 3,
                borderWidth: 1,
                borderColor: '#232323',
                boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                display: 'inline-block',
                cursor: 'pointer'
            }
        };

        return (
            <div style={styles.frame}>
                <div style={styles.colors}>
                    <div style={styles.color1}/>
                    <div style={styles.color2}/>
                    <div style={styles.color3}/>
                    <div style={styles.color4}/>
                </div>
            </div>
        );
    }
}