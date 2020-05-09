import React, { Component } from 'react';
import Header from '../../common/header/Header';
import './Home.css';

class Home extends Component {
    render() {
        return(
            <Header {...this.props} showSearchBox={true} />
        )
    }
}

export default Home;