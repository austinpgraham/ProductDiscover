import React, { Component } from 'react';
import { TextInput, Button } from '../components/input';
import { NavBar } from '../components/nav';
import axios from 'axios';
import { ROOT } from '../constants';
import { Product } from '../components/display';
import ReactLoading from 'react-loading';
import { Link } from 'react-router-dom';

class SearchForm extends Component {
    constructor(props) {
        /**
         * Construct the component and initialize state.
         */
        super(props);
        this.state = {searchTerm: "", isLoading: false, products: null}

        // Link instance functions
        this.doSearch = this.doSearch.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
        this.renderProducts = this.renderProducts.bind(this);
    }

    handleTermChange(e) {
        // Re-init search term on key change
        this.setState({searchTerm: e.target.value});
    }

    renderProducts(data) {
        /**
         * Render loaded products on query success.
         */
        if (data != null) {
            var products = []
            for(var i = 0; i < data.length; i++) {
                var new_product = <Link to={"/products/"+data[i].asin} key={data[i].asin} style={{ textDecoration: 'none' }}><Product>{data[i]}</Product></Link>;
                products.push(new_product);
            }
            return (
                <div style={styles.grid}>
                    {products}
                </div>
            );
        }
        return <div></div>;
    }

    showLoading() {
        /**
         * Show loading state
         */
        if(this.state.isLoading) {
            return <ReactLoading height={"50px"} width={"50px"}/>
        }
        return "";
    }

    doSearch() {
        /**
         * Query the server for products with the search term.
         */
        this.setState({isLoading: true});
        const URL = ROOT + "/products/search/" + this.state.searchTerm;
        if(this.state.searchTerm !== "") {
            axios.get(URL).then(response => this.setState({products: response.data, isLoading: false}));
        }
    }

    render(){
        return (
            <div style={ styles.pageStyle }>
                <NavBar />
                <div style={ styles.contentStyle }>
                    <p style={ styles.labelStyle }>Search: </p>
                    <TextInput onChange={ this.handleTermChange } required/>
                    <Button onClick={ this.doSearch }>Search</Button>
                    {this.showLoading()}
                </div>
                <div style={styles.contentStyle}>
                    {this.renderProducts(this.state.products)}
                </div>
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
        marginTop: '90px',
        marginLeft: '200px',
        marginRight: '200px',
        alignItems: 'center'
    },
    labelStyle: {
        marginRight: '20px',
        fontSize: 25,
        fontFamily: 'Arial'
    },
    grid: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
}

export default SearchForm;
