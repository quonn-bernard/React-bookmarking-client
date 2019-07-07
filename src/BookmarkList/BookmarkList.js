import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Bookmark from "../Bookmark/Bookmark";
import MyContext from "../MyContext/MyContext"
import { withRouter } from "react-router-dom";

class BookmarkList extends Component {
    static defaultProps = {
        match: {
            params: {}
        }
    }

    static contextType = MyContext;

    handleDelete = bookmarkId => {
        this
            .props
            .history
            .push(`/`)
    }

    render() {
        const { collectionId } = this.props.match.params
        const {
            bookmarks = []
        } = this.context

        const bookmarksForCollection = ((!collectionId)
            ? bookmarks
            : bookmarks.filter(bookmark => bookmark.collectionId === collectionId))

        return (
            <div>
                <Link to="/AddBookmark">Add Bookmark</Link>
                <ul>
                    {bookmarksForCollection.map(bookmark => {
                    // console.log(bookmark)
                   return <li key={bookmark.id}>
                        <Bookmark
                            id={bookmark.id}
                            name={bookmark.name}
                            content={bookmark.content}
                            date={bookmark.modified}
                            onDelete={this.handleDeleteBookmark}
                            collection_id={bookmark.collection_id}
                            >
                            </Bookmark>
                    </li>})}
                </ul>
            </div>
        )

    }
}
const BookmarkListWithRouter = withRouter(BookmarkList);
export default BookmarkListWithRouter;
