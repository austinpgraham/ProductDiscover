import React, { Component } from 'react';
import Text from './Text';
import Product from './Product';
import ReactLoading from 'react-loading';
import axios from 'axios';
import { ROOT } from '../../constants';
import { Link } from 'react-router-dom';

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
                this.setState({products: products, isLoading: false});
            });
        }
    }

    renderContent() {
        if(this.state.isLoading) {
            return (
                <div style={ styles.contentStyle }>
                    <ReactLoading height={"50px"} width={"50px"}/>
                </div>
            );
        }
        
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
