import React from 'react';
import ProfileApiService from '../../services/profile-api-service';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service';

export default class AccountPanel extends React.Component {
    

    render() {
        let username;
        (!TokenService.hasAuthToken)
        ?username = `Guest`
        :username = this.props.profile.username
        
        return (
            <div>{username}</div>
        )
    }
}