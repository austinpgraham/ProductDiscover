import React, { Component } from 'react';

class Title extends Component {
    render() {
        // Render a simple header.
        return(
            <h1 style={ styles.titleStyle } >{this.props.children}</h1>
        )
    }
}

const styles = {
    titleStyle: {
        fontFamily: 'Arial',
        fontSize: 70,
        fontWeight: 'bold',
    }
}

export default Title;
