import React, { Component } from 'react';
import Text from './Text';
import Product from './Product';
import ReactLoading from 'react-loading';
import axios from 'axios';
import { ROOT } from '../../constants';

class ProductList extends Component {

    constructor(props) {
        super(props);

        this.state = {isLoading: true, products: []};
    }

    componentDidMount() {
        var asinList = this.props.asins;
        for(var i = 0; i < asinList.length; i++) {
            var URL = ROOT + "/products/" + asinList[i];
            axios.get(URL).then(response => {
                var products = this.state.products;
                products.push(response.data.pop());
                console.log(products);
                this.setState({products: products});
                if(this.state.products.length >= 5) {
                    this.setState({isLoading: false});
                }
            });
        }
    }

    renderContent() {
        debugger;
        if(this.state.isLoading) {
            return (
                <div style={ styles.contentStyle }>
                    <ReactLoading height={"50px"} width={"50px"}/>
                </div>
            );
        }
        
        var components = []
        for(var i = 0; i < this.state.products; i++) {
            var newProduct = <Product>{this.state.products[i]}</Product>
            components.push(newProduct);
        }
        return (components);
    }

    render() {
        return (
            <div>
                <div>
                    <Text>{this.props.children}</Text>
                </div>
                <div style={ styles.products }>
                    {this.renderContent()}
                </div>
            </div>
        );
    }
}

const styles = {
    products: {
        display: 'flex',
        flexDirection: 'row',
        border: 'solid',
        borderRadius: 4,
        borderStyle: 'line',
        borderWidth: '2px',
        width: '100%',
    }
}

export default ProductList;
