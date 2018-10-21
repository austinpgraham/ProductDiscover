import React, { Component } from 'react';
import { TextInput } from '../components/input';
import { NavBar } from '../components/nav';

class SearchForm extends Component {
    render(){
        return (
            <div>
                <NavBar />
                <h1>Search form!</h1>
                <TextInput />
            </div>
        )
    }
}

export default SearchForm;
