import React, { Component } from 'react'

//Router import for redirection.
import { Route, Switch } from "react-router-dom";

//Imports of different pages in the application
import Home from './screens/home/Home';

/**
 * This class represents the whole FoodOrdering Application.
 */
class FoodOrdering extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' render={(props) => <Home {...props} />} />
            </Switch>
        )
    }
}

export default FoodOrdering;