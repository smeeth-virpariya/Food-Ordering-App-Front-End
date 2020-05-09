import React, { Component } from 'react';
import Header from '../../common/header/Header';

import './Profile.css';

class Profile extends Component {
    render() {
        return (
            <div>
                <Header showSearchBox={false} />
                <div className="page-title">
                    <h1 className="text">Profile Page</h1>
                </div>
            </div>
        )
    }
}

export default Profile;