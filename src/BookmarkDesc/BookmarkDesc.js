import React, { Component } from 'react';
import MyContext from "../MyContext/MyContext"
import config from "../config";
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

class BookmarkDesc extends Component {
    static defaultProps = {
        match: {
            params: {}
        },
        onDelete: () => {},
    }
    
    static contextType = MyContext;

    handleBackBtn = () => {
        this.props.history.push('/')
    }

    handleClickDelete = e => {
        e.preventDefault()
        const { bookmarkId } = this.props.match.params

        fetch(`${config.API_ENDPOINT}/bookmarks/${bookmarkId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },
        })
            .then(res => {
                if (!res.ok)
                    return res.json().then(e => Promise.reject(e))
                return res.json()
            })
            .then(() => {
                this.context.deleteBookmark(bookmarkId)
                // allow parent to perform extra behaviour
                this.props.onDelete(bookmarkId)
            })
            .catch(error => {
                console.error({ error })
            })
    }

    render() {
        const {
            bookmarks = []
        } = this.context
        const { bookmarkId } = this.props.match.params
        const bookmark = bookmarks.find(bookmark => bookmark.id === bookmarkId)
        return (
            <div>
                <h1>
                    {bookmark.name}
                </h1>
                <button onClick={this.handleClickDelete}>Delete</button>
                <p>{bookmark.modified}</p>
                <p>{bookmark.content}</p>
                <Link to="/"><button>Back</button></Link>
            </div>
        )
    }
}

BookmarkDesc.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    modified: PropTypes.string,
    content: PropTypes.string,
  };

export default BookmarkDesc;
