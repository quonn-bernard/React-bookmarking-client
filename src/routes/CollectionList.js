import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import appContext from "../appContext/appContext";
import CollectionApiService from '../services/collection-api-service';
import Collection from '../Components/Collection/Collection';
import TokenService from '../services/token-service';
import ProfileApiService from '../services/profile-api-service';
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder } from '@fortawesome/free-solid-svg-icons';

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
        let count;
        const folder = <FontAwesomeIcon icon={faFolder} className="littleFolder" />
        const shadowFolder = <FontAwesomeIcon icon={faFolder} className="shadowFolder" />
        if (!TokenService.hasAuthToken()) {
            return <Redirect to='/login' />
        }
        const {
            collections = [], bookmarks = []
        } = this.context

        const userCollections = collections.filter(collection => {
            return parseInt(collection.author) === this.state.profile.id
        })
        return (
            <div className="collection-container">
                <h2>{shadowFolder}{folder} {this.context.profile.username}'s Collections ({userCollections.length})</h2>
                <div className="collection-grid">
                    {userCollections.map((collection, count) => {
                        
                        return <Collection bm={bookmarks} key={collection.id} id={collection.id} name={collection.name} author={collection.author}>
                        </Collection>

                    })}
                </div>
            </div>

        )
    }
}

const CollectionListWithRouter = withRouter(CollectionList);
export default CollectionListWithRouter;
