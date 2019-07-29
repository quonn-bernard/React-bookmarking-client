import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import appContext from "../appContext/appContext"
import { withRouter } from "react-router-dom";
import "./CollectionList.css";

class CollectionList extends Component {

    static contextType = appContext;

    render() {
        const {
            collections = []
        } = this.context

        return (
            <div className="collection">
                <Link to="/AddCollection" style={{color: "white"}}>Add Collection</Link>
                {collections.map(collection => {
                    return <div key={collection.id} className="collectionLink">
                        <Link  to={"/collection/" + collection.id}>
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
