import React, { Component } from 'react';
import { UNAVAILABLE } from '../../constants';

function _shortenText(text, limit) {
    /**
     * Shorten the text of a title based on
     * the given limit. Return the original if 
     * too short.
     */
    if(text.length < limit) {
        return text;
    }
    return text.substr(0, limit) + "...";
}

function _get_image_path(path) {
    /**
     * Return the path to the relevant image
     * or the path to the unavailable image.
     */
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
                <img style={styles.img} src={_get_image_path(this.props.children.imURL)} alt="Not available."/>
            </div>
        );
    }
}

const styles = {
    main:{
        width: '200px',
        height: '200px',
        boxShadow: '0 3px 5px 2px #216C2A',
        marginRight: '10px',
        marginBottom: '10px',
        paddingRight: '15px',
        paddingLeft: '15px',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column'
    },
    text: {
        fontWeight: 'bold',
        color: 'black',
        textDecoration: 'underline',
        fontSize: 15
    },
    img: {
        width: '133px',
        height: '133px',
    },
    bleh: {
        width: '200px',
        height: '50px'
    }
}

export default Product;
