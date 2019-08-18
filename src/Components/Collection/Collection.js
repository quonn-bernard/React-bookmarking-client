import React from 'react';
import './Collection.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faPaste } from '@fortawesome/free-solid-svg-icons';

class Collection extends React.Component {

    render() {
        let matches = this.props.bm.filter(bm => {
            return (bm.collection_id === this.props.id)
        })

        const folder = <FontAwesomeIcon icon={faFolder} className=" thumbsUp fa-4x" />
        const shadowFolder = <FontAwesomeIcon icon={faFolder} className="shadowFolder fa-4x" />
        const paste = <FontAwesomeIcon icon={faPaste} className="file-icon" />
        return (
            <Link to={"/collection/" + this.props.id} className={"collection"}>
                <article>
                    <span className="collection-name">{this.props.name}</span>
                    <span className="folder">{shadowFolder}{folder}</span>
                    <span className="count-text">{paste}{matches.length}</span>
                </article>
            </Link>
        )
    }
}

export default Collection;