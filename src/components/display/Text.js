import React, { Component } from 'react';

class Text extends Component {
    render() {
        // Render simple text with style.
        return(
            <p style={ styles.pStyle }>{ this.props.children }</p>
        )
    }
}

const styles = {
    pStyle: {
        fontSize: 30,
        fontFamily: 'Arial'
    }
}

export default Text;
