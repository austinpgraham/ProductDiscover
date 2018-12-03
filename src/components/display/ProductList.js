import React, { Component } from 'react';
import Text from './Text';
import Product from './Product';
import ReactLoading from 'react-loading';
import axios from 'axios';
import { ROOT } from '../../constants';
import { Link } from 'react-router-dom';

class ProductList extends Component {

    constructor(props) {
        /**
         * Contruct the component and 
         * initialize the state.
         */
        super(props);

        this.state = {isLoading: true, products: []};
    }

    componentDidMount() {
        /**
         * When the component is loaded to the page, 
         * query the server for each product, and add
         * the resulting data to the state.
         */
        var asinList = this.props.asins;
        for(var i = 0; i < asinList.length; i++) {
            var URL = ROOT + "/products/" + asinList[i];
            axios.get(URL).then(response => {
                var products = this.state.products;
                products.push(response.data.pop());
                this.setState({products: products, isLoading: false});
            });
        }
    }

    renderContent() {
        /**
         * Render the loading image while being queried,
         * otherwise load links to the other products
         */
        if(this.state.isLoading) {
            return (
                <div style={ styles.contentStyle }>
                    <ReactLoading height={"50px"} width={"50px"}/>
                </div>
            );
        }
        
        // Load the stated data into sets of components.
        var components = []
        for(var i = 0; i < this.state.products.length; i++) {
            var newProduct = <Link onClick={this.forceUpdate} to={"/products/"+this.state.products[i].asin} key={this.state.products[i].asin}><Product>{this.state.products[i]}</Product></Link>;
            components.push(newProduct);
        }
        return components;
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
    }
}

export default ProductList;
