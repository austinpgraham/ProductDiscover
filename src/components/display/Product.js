import React, { Component } from 'react';
import { UNAVAILABLE } from '../../constants';

function _shortenText(text, limit) {
    if(text.length < limit) {
        return text;
    }
    return text.substr(0, limit) + "...";
}

function _get_image_path(path) {
    if(path != null) {
        return path;
    }
    return UNAVAILABLE;
}

class Product extends Component {

    render() {
        return (
            <div style={styles.main}>
                <div style={styles.bleh}>
                    <p style={styles.text}>{_shortenText(this.props.children.title, 50)}</p>
                </div>
                <div style={styles.centered}>
                    <img style={styles.img} src={_get_image_path(this.props.children.imURL)} alt="Not available."/>
                </div>
            </div>
        );
    }
}

const styles = {
    main:{
        width: '300px',
        height: '300px',
        boxShadow: '0 3px 5px 2px #216C2A',
        marginRight: '10px',
        marginBottom: '10px',
        paddingRight: '15px',
        paddingLeft: '15px',
        backgroundColor: 'white'
    },
    text: {
        fontWeight: 'bold',
        color: 'black',
        textDecoration: 'underline',
        fontSize: 20
    },
    centered: {
        display: 'flex',
        justifyContent: 'center'
    },
    img: {
        width: '200px',
        height: '200px',
    },
    bleh: {
        width: '300px',
        height: '50px'
    }
}

export default Product;
