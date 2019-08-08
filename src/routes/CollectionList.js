import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import appContext from "../appContext/appContext";
import CollectionApiService from '../services/collection-api-service';
import TokenService from '../services/token-service';
import ProfileApiService from '../services/profile-api-service';
import { withRouter } from "react-router-dom";
import "./CollectionList.css";

class CollectionList extends Component {
    state = {
        profile: {},
        collections: []
    }
    static contextType = appContext;

    getUsersCollections = () => {
        CollectionApiService.getCollectionsForUser(this.state.profile.id)
            .then(collections => {
                this.setState({
                    collections,
                })
            });
    }

    // get the profile to update the state when component mounts
    componentDidMount() {
        if (TokenService.hasAuthToken()) {
            ProfileApiService.getProfile()
                .then(profile => {
                    this.setState({
                        profile,
                    });
                    this.getUsersCollections();
                });
        }
    }

    render() {
        if (!TokenService.hasAuthToken()) {
            return <Redirect to='/login' />
        }
        const {
            collections = []
        } = this.context
        const userCollections = collections.filter(collection => {
            return parseInt(collection.author) === this.state.profile.id
        })
        return (
            <div className="collection">
                {/* <a href="https://www.google.com">Google</a> */}
                <Link to="/AddCollection" style={{ color: "white" }}>Add Collection</Link>
                {userCollections.map(collection => {
                    return <div key={collection.id} className="collectionLink">
                        <Link to={"/collection/" + collection.id}>
                            <span>{collection.name}</span>
                        </Link>
                    </div>
                })}
            </div>
        )
    }
}

const CollectionListWithRouter = withRouter(CollectionList);
export default CollectionListWithRouter;
