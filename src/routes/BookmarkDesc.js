import React, { Component } from 'react';
import appContext from "../appContext/appContext"
import config from "../config";
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

class BookmarkDesc extends Component {
    static defaultProps = {
        match: {
            params: {}
        },
        onDelete: () => {},
        bookmarks: []
    }

    
    
    static contextType = appContext;

    

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
        // http://api.screenshotlayer.com/api/capture? access_key = 61195edb33dea3bafaaebb353570c8e8& url = http%3A%2F%2Fwebsite.com%3Fexample%3Dyes
        const { bookmarkId } = this.props.match.params
        
            const myBookmark = this.props.bookmarks.filter((bookmark) => bookmark.id === parseInt(bookmarkId))
            console.log(encodeURIComponent(myBookmark[0].content))   
             let url = `http://api.screenshotlayer.com/api/capture?access_key=61195edb33dea3bafaaebb353570c8e8&url=${encodeURIComponent(myBookmark[0].content)}`;
             console.log(url) 
             let urlScreenshot = fetch(url).then(function(response) {
                console.log(response); // "opaque"
              })
             return (
            <div>
                <h1>
                   {myBookmark[0].name}
                </h1>
                <button onClick={this.handleClickDelete}>Delete</button>
                <p>{urlScreenshot}</p>
                <p>{myBookmark[0].modified}</p>
                <p>{myBookmark[0].type}</p> 
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
