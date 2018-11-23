import React, { Component } from 'react';
import { NavBar } from '../components/nav';

class ProductForm extends Component {
    constructor(props) {
        super(props);
        this.state = {asin: this.props.match.params.asin}
    }

    componentDidMount() {
        
    }

    render() {
        return (
            <div style={ styles.pageStyle }>
                <NavBar />
                <p>{this.state.asin}</p>
            </div>
        )
    }

}

const styles = {
    pageStyle: {
        backgroundColor: '#C9CADC',
        width: '100%',
        minHeight: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
    }
}

export default ProductForm;