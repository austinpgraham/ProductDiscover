import React, { Component } from 'react';
import './NavBar.css';

class NavBar extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        window.location.assign('/');
    }

    render() {
        return(
            <div style={ styles.barStyle }>
                <div style={ styles.labelStyle }>
                    <h1 onClick={this.handleClick}>ProductDiscover</h1>
                </div>
            </div>
        )
    }
}

const styles = {
    barStyle: {
        background: 'black',
        color: '#06C4EE',
        height: '75px',
        top: 0,
        left: 0,
        position: 'fixed',
        width: '100%',
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
    },
    labelStyle: {
        paddingLeft: '50px',
        fontFamily: 'Walkway'
    }
}

export default NavBar;
