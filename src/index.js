// Dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

// Google Material design
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';

// Components
import App from './components/app';
import Home from './components/home';
import Character from './components/character';
import NotFound from './components/not-found';

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="character/:name" component={Character}/>
        <Route path='*' component={NotFound} />
        </Route>
    </Router>
), document.getElementById('root'))
