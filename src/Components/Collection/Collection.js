import React from 'react';
import './Collection.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder } from '@fortawesome/free-solid-svg-icons';

class Collection extends React.Component {

    render() {
        const folder = <FontAwesomeIcon icon={faFolder} className=" thumbsUp fa-4x" />
        return (
            <Link to={"/collection/" + this.props.id} className={"collection"}>
                <article>
                    <span className="folder">{folder}</span>
                    <span className="collection-name">{this.props.name}</span>
                </article>
            </Link>
        )
    }
}

export default Collection;