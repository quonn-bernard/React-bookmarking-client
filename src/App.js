import React, { Component } from 'react';
import './App.css';
import BookmarkDesc from "./BookmarkDesc/BookmarkDesc";
import BookmarkList from "./BookmarkList/BookmarkList";
import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import AddCollection from './AddCollection/AddCollection';
import AddBookmark from './AddBookmark/AddBookmark';
import CollectionList from "./CollectionList/CollectionList";
import MyContext from "./MyContext/MyContext"
import config from "./config";
import NavBar from './NavBar/NavBar';
import MblNav from './MblNav/MblNav';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            collections: [],
            bookmarks: [],
            hamburgerOpen: false
        }
    }

    swapOpen = () => {
        this.setState({
            hamburgerOpen: !this.state.hamburgerOpen
        });
    }

    closeHamburger = () => {
        this.setState({
            hamburgerOpen: false
        })
    }

    handleDeleteBookmark = (data) => {
        const { bookmarkId } = data
        this.setState({
            bookmarks: this
                .state
                .bookmarks
                .filter(bookmark => bookmark.id !== bookmarkId)
        })
        this.props.history.push('/');
    }

    handleAddCollection = collection => {
        this.setState({
            collections: [
                ...this.state.collections,
                collection
            ]
        })
        this.props.history.push('/');
    }

    handleAddBookmark = bookmark => {
        this.setState({
            bookmarks: [
                ...this.state.bookmarks,
                bookmark
            ]
        })
        this.props.history.push('/');
    }

    componentDidMount() {
        Promise.all([
            fetch(`${config.API_ENDPOINT}/bookmarks`),
            fetch(`${config.API_ENDPOINT}/collections`)
        ]).then(([bookmarksRes, collectionsRes]) => {
            if (!bookmarksRes.ok)
                return bookmarksRes.json().then(e => Promise.reject(e))
            if (!collectionsRes.ok)
                return collectionsRes.json().then(e => Promise.reject(e))

            return Promise.all([
                bookmarksRes.json(),
                collectionsRes.json()
            ])
        }).then(([bookmarks, collections]) => {
            this.setState({ bookmarks, collections })
        }).catch(error => {
            console.error({ error })
        })
    }

    render() {
        const value = {
            bookmarks: this.state.bookmarks,
            collections: this.state.collections,
            deleteBookmark: bookmarkId => this.handleDeleteBookmark({ bookmarkId }),
            AddCollection: (e) => this.handleAddCollection(e),
            AddBookmark: (e) => this.handleAddBookmark(e),
            goBack: () => this.handleBackButton()
        }

        return (
            <MyContext.Provider value={value}>
                <div className="App">
                    <NavBar swapOpen={this.swapOpen}></NavBar>
                    <MblNav open={this.state.hamburgerOpen}></MblNav>
                    <section className="bookmarksContentBody">
                        <aside>
                            <nav>
                                {< Link to="/AddCollection" > <h4>Add Collection</h4> </Link>}
                                {< Link to="/AddBookmark" > <h4>Add Bookmark</h4> </Link>}
                            </nav>
                        </aside>
                        <main onClick={this.closeHamburger}>
                            <Route exact path='/' component={CollectionList} />
                            <Route exact path='/collection/:collectionId' component={CollectionList} /> {/* Collections Path */}

                            <Route path='/collection/:collectionId' render={(props) => <BookmarkList {...props} bookmarks={this.state.bookmarks} />} />
                            <Route path='/bookmark/:bookmarkId' render={(props) => <BookmarkDesc {...props} bookmarks={this.state.bookmarks} />} />
                            {/* <Route exact path='/bookmark/:bookmarkId' component={BookmarkDesc} /> Bookmark Path */}
                            <Route exact path='/AddCollection' component={AddCollection} /> {/*Add Collection Form Path*/}
                            <Route path='/AddBookmark' component={AddBookmark} />{/* Add Bookmark Form Path */}
                        </main>
                    </section>
                </div>
            </MyContext.Provider>
        );
    }
}

export default withRouter(App);
