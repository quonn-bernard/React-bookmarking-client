import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MyContext from "../MyContext/MyContext"
import { withRouter } from "react-router-dom";
import "./CollectionList.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder } from '@fortawesome/free-solid-svg-icons'

class CollectionList extends Component {

    static contextType = MyContext;

    render() {
        const folder = <FontAwesomeIcon icon={faFolder} className="folder fa-7x" />
        const {
            collections = []
        } = this.context
        return (
            <div className="collections">
                <h2>YOUR COLLECTIONS</h2>
                <div className="collection-grid">
                    {collections.map(collection => {
                        return <div key={collection.id} className="collectionLink">
                            <Link to={"/collection/" + collection.id}>
                                <div>{folder}</div>
                                <span>{collection.name}</span>
                            </Link>
                        </div>

                    })}
                </div>
            </div>
        )
    }
}

const CollectionListWithRouter = withRouter(CollectionList);
export default CollectionListWithRouter;
