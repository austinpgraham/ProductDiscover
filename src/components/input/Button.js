import React, { Component } from 'react';

class Button extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div style={ styles.buttonStyle } onClick={ this.props.onClick } >
                { this.props.children }
            </div>
        )
    }
}

const styles = {
    buttonStyle: {
        color: 'white',
        background: '#06C4EE',
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
        fontFamily: 'Arial',
        textAlign: 'center',
        fontSize: 20,
        width: '150px',
        fontWeight: 'bold',
        cursor: 'pointer',
    }
}

export default Button;
