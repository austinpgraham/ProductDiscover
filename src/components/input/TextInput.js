import React, { Component } from 'react';

class TextInput extends Component {
    render() {
        // Render an input box
        return(
            <input 
                style={ styles.inputStyle } 
                type='text' 
                onChange={this.props.onChange}
            />
        )
    }
}

const styles = {
    inputStyle: {
        height: 45,
        width: 350,
        borderRadius: 4,
        border: '1px solid white',
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
        marginTop: 4,
        marginBottom: 4,
        paddingLeft: 4,
        fontFamily: 'Didot, sansserif',
        fontSize: 17
    }
}

export default TextInput;
