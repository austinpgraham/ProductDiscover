import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

class NavBar extends Component {

    render() {
        return(
            <div style={ styles.barStyle }>
                <div style={ styles.labelStyle }>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <h1>ProductDiscover</h1>
                    </Link>
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
        fontFamily: 'Walkway',
        cursor: 'pointer',
    }
}

export default NavBar;
