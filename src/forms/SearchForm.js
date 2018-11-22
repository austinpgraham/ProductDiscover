import React, { Component } from 'react';
import { TextInput, Button } from '../components/input';
import { NavBar } from '../components/nav';
import axios from 'axios';
import { ROOT } from '../constants';
import { Product } from '../components/display';
import ReactLoading from 'react-loading';

class SearchForm extends Component {
    constructor(props) {
        super(props);
        this.state = {searchTerm: "", isLoading: false, products: null}

        this.doSearch = this.doSearch.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
        this.renderProducts = this.renderProducts.bind(this);
    }

    handleTermChange(e) {
        this.setState({searchTerm: e.target.value});
    }

    renderProducts(data) {
        if (data != null) {
            var products = []
            for(var i = 0; i < data.length; i++) {
                var new_product = <Product key={data[i].asin}>{data[i]}</Product>;
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
        if(this.state.isLoading) {
            return <ReactLoading height={"50px"} width={"50px"}/>
        }
        return ""
    }

    doSearch() {
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
