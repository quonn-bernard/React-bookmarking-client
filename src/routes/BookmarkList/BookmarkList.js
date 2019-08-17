import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Bookmark from "../../Components/Bookmark/Bookmark";
import appContext from "../../appContext/appContext"
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import Collection from '../../Components/Collection/Collection';

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
        const folder = <FontAwesomeIcon icon={faFolder} className="littleFolder" />
        const shadowFolder = <FontAwesomeIcon icon={faFolder} className="shadowFolder" />
        const { collectionId } = this.props.match.params
        const { bookmarks = [] } = this.context
        let count = 0;
        let thisCollection = this.context.collections.filter(collection => {

            if (parseInt(collectionId) === collection.id) {

                return collection
            }
        })
        let name;
        {
            if (thisCollection[0]) {
                name = thisCollection[0].name
            }
        }
        console.log(name)
        let bookmarksForCollection = [];

        if (this.props.bookmarks.length) {
            bookmarksForCollection = bookmarks.map(bookmark => {

                if (bookmark.collection_id === parseInt(collectionId)) {
                    count++
                    return <li className="bookmark" key={bookmark.id}>
                        <Bookmark
                            icon={this.props.icon}
                            key={bookmark.id}
                            id={bookmark.id}
                            name={bookmark.name}
                            content={bookmark.content}
                            date={bookmark.modified}
                            type={bookmark.type}
                            onDelete={this.handleDeleteBookmark}
                            collection_id={bookmark.collection_id}
                        >
                        </Bookmark>
                    </li>
                }

            })
        } else {
            bookmarksForCollection = 'no bookmarks yet...'
        }


        return (
            <div>
                <h2>{this.props.icon}{name} ({count})</h2>
                <h3></h3>
                <ul className="bmList">
                    {bookmarksForCollection}
                </ul>
            </div>
        )

    }
}
const BookmarkListWithRouter = withRouter(BookmarkList);
export default BookmarkListWithRouter;
