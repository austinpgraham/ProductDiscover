import React, { Component } from 'react';
import { TextInput, Button } from '../components/input';
import { NavBar } from '../components/nav';
import axios from 'axios';
import { ROOT } from '../constants';

class SearchForm extends Component {
    constructor(props) {
        super(props);
        this.state = {searchTerm: "", isLoading: false}

        this.doSearch = this.doSearch.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
        this.renderProducts = this.renderProducts.bind(this);
    }

    handleTermChange(e) {
        this.setState({searchTerm: e.target.value});
    }

    renderProducts(data) {
        console.log(data);
    }

    doSearch() {
        const URL = ROOT + "/products/search/*" + this.state.searchTerm + "*";
        if(this.state.searchTerm !== "") {
            axios.get(URL).then(response => this.renderProducts(response.data));
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
                </div>
            </div>
        )
    }
}

const styles = {
    pageStyle: {
        backgroundColor: '#C9CADC',
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
    },
    contentStyle: {
        display: 'flex',
        marginTop: '90px',
        marginLeft: '200px',
        alignItems: 'center'
    },
    labelStyle: {
        marginRight: '20px',
        fontSize: 25,
        fontFamily: 'Arial'
    }
}

export default SearchForm;
