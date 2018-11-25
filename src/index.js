import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import { SearchForm, EntryForm, ProductForm } from './forms';

ReactDOM.render((
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={ EntryForm } />
            <Route path="/search" component={ SearchForm } />
            <Route path="/products/:asin" component={ ProductForm } />
        </Switch>
    </BrowserRouter>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
