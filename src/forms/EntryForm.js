import React, { Component } from 'react';
import { NavBar } from '../components/nav';
import { Title, Text } from '../components/display';
import { Button } from '../components/input';
import { Link } from 'react-router-dom';

class EntryForm extends Component {

    render() {
        // Render the intro page w/ text
        return(
            <div style={ styles.pageStyle }>
                <NavBar />
                <div style={ styles.contentStyle }>
                    <Title>Welcome!</Title>
                    <Text>
                        This is the implementation of my project for CS 5593 Data Mining at the University of Oklahoma.
                        I have used various data mining techniques to enhance the classic ecommerce product search experience.
                        Techniques employed include Singular Value Decomposition, Naive Bayes classification, and text clustering.
                        Enjoy!
                    </Text>
                    <Link to="/search" style={{ textDecoration: 'none' }}>
                        <Button>Let's Get Started!</Button>
                    </Link>
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
        left: 0
    },
    contentStyle: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '90px',
        marginLeft: '200px',
        marginRight: '200px',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    }
}

export default EntryForm;
