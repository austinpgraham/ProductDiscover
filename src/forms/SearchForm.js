import React, { Component } from 'react';
import { TextInput } from '../components/input';
import { NavBar } from '../components/nav';

class SearchForm extends Component {
    render(){
        return (
            <div>
                <NavBar />
                <div style={ styles.pageStyle }>
                    <TextInput />
                </div>
            </div>
        )
    }
}

const styles = {
    pageStyle: {
        marginTop: '90px',
    }
}

export default SearchForm;
