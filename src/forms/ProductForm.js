import React, { Component } from 'react';
import { NavBar } from '../components/nav';
import axios from 'axios';
import { ROOT, UNAVAILABLE, USERID } from '../constants';
import ReactLoading from 'react-loading';
import { Text, ProductList, ReviewVis } from '../components/display';

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

function _get_price_string(price) {
    /**
     * Render the price as a string. Show
     * unknown if the price is not listed.
     */
    if(price == null) {
        return "Unknown";
    }
    return "$"+price;
}

class ProductForm extends Component {

    constructor(props) {
        /**
         * Construct component and initialize state.
         */
        super(props);

        this.state = {isLoading: true, asins: []};
    }

    componentDidMount() {
        /**
         * When the component is mounted to
         * the screen, show loading state
         */
        this.setState({isLoading: true});
        var asin = this.props.match.params.asin
        var URL = ROOT + "/products/" + asin;
        // Request from the server the particular product
        axios.get(URL).then(response => {
            var data = response.data.pop();
            this.setState({
                imgSrc: data.imURL,
                error: false,
                isLoading: false,
                title: data.title,
                price: data.price,
                brand: data.brand,
                categories: data.categories,
                asin: asin
            });
        }).catch(error => this.setState({error: true, isLoading: false}));

        // Get the list of recommendations for the static user ID.
        URL = ROOT + "/reviews/recommendations/" + USERID;
        axios.get(URL).then(response => {
            var asins = response.data.map(a => a.asin);
            this.setState({asins: asins});
        });
    }

    renderList() {
        /**
         * Render the product list if enough products
         * have been loaded.
         */
        if(this.state.asins.length >= 5) {
            return <ProductList asins={this.state.asins}>You May Also Like:</ProductList>
        }
        return null;
    }

    renderContent() {
        /**
         * Show loading/error based on state.
         */
        if(this.state.isLoading) {
            return (
                <div style={ styles.overall }>
                    <div style={ styles.contentStyle }>
                        <ReactLoading height={"50px"} width={"50px"}/>
                    </div>
                </div>
            );
        }
        else if (this.state.error) {
            return (
                <div style={ styles.overall }>
                    <div style={ styles.contentStyle }>
                        <p>Product not found!</p>
                    </div>
                </div>
            );
        }
        // If everything is properly loaded, 
        // show the product information.
        return (
            <div style={ styles.overall }>
                <div style={ styles.contentStyle }>
                    <img src={_get_image_path(this.state.imgSrc)} alt="Not available" style={ styles.img }></img>
                    <div style={ styles.subContentStyle }>
                        <Text>{ this.state.title }</Text>
                        <p>Price: {_get_price_string(this.state.price)}</p>
                        <p>Brand: {(this.state.brand == null) ? "Unknown" : this.state.brand}</p>
                        <p>Categories: {(this.state.categories == null) ? "Unknown" : this.state.categories.join()}</p>
                    </div>
                </div>
                <ReviewVis asin={ this.state.asin } height={500} width={500}></ReviewVis>
                {this.renderList()}
            </div>
        );
    }

    render() {
        return (
            <div style={ styles.pageStyle }>
                <NavBar />
                {this.renderContent()}
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
    },
    contentStyle: {
        display: 'flex',
        alignItems: 'center',
    },
    img: {
        width: '200px',
        height: '200px',
    },
    subContentStyle: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '20px',
    },
    overall: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '90px',
        marginLeft: '200px',
        marginRight: '200px',
    }
}

export default ProductForm;