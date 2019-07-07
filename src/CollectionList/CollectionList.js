import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MyContext from "../MyContext/MyContext"
import { withRouter } from "react-router-dom";
import "./CollectionList.css";

class CollectionList extends Component {

    static contextType = MyContext;

    render() {
        const {
            collections = []
        } = this.context
        return (
            <div>
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
