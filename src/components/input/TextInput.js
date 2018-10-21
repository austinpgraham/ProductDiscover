import React, { Component } from 'react';

class TextInput extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    render() {
        return(
            <input 
                style={ styles.inputStyle } 
                type='text' 
                onChange={this.handleChange}
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
