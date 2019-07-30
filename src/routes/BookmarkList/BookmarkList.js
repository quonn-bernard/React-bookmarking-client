import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Bookmark from "../../Components/Bookmark/Bookmark";
import appContext from "../../appContext/appContext"
import { withRouter } from "react-router-dom";

class BookmarkList extends Component {
    static defaultProps = {
        match: {
            params: {}
        },
        bookmarks: []
    }

    static contextType = appContext;

    handleDelete = bookmarkId => {
        this
            .props
            .history
            .push(`/`)
    }

    render() {
        const { collectionId } = this.props.match.params
        const { bookmarks = [] } = this.context

        let bookmarksForCollection = [];

        if(this.props.bookmarks.length){
            bookmarksForCollection = this.props.bookmarks.map(bookmark => {
                if(bookmark.collection_id === parseInt(collectionId))
                return <li key={bookmark.id}>
                    <Bookmark
                        key={bookmark.id}
                        id={bookmark.id}
                        name={bookmark.name}
                        content={bookmark.content}
                        date={bookmark.modified}
                        onDelete={this.handleDeleteBookmark}
                        collection_id={bookmark.collection_id}
                    >
                    </Bookmark>
                </li>
            })
        }else {
            bookmarksForCollection = 'no bookmarks yet...'
        }

         
        return (
            <div>
                <ul>
                    {bookmarksForCollection}   
                </ul>
            </div>
        )

    }
}
const BookmarkListWithRouter = withRouter(BookmarkList);
export default BookmarkListWithRouter;
