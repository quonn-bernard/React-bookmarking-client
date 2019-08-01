import React from 'react';
import ProfileApiService from '../../services/profile-api-service';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service';

export default class AccountPanel extends React.Component {
    logout(){
        TokenService.clearAuthToken()
        this.setState({
            profile:{}
        })
    }

    render() {
        return (
            <div>{this.props.profile.username}
            {(TokenService.hasAuthToken())
                ?  < Link onClick={this.logout}> <h4>Logout</h4> </Link>
                :'Please Login'}
                </div>
        )
    }
}