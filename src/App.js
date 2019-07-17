import React, { Component } from 'react';
import { Link, Route, withRouter } from 'react-router-dom';
import NavBar from './Components/NavBar/NavBar';
import MblNav from './Components/MblNav/MblNav';
import BookmarkDesc from "./routes/BookmarkDesc";
import CollectionList from "./routes/CollectionList";
import CollectionAPI from './services/collection-api-service';
import BookmarkAPI from './services/bookmark-api-service';
import BookmarkList from "./routes/BookmarkList/BookmarkList";
import AddCollection from './routes/AddCollection/AddCollection';
import AddBookmark from './routes/AddBookmark/AddBookmark';
import MyContext from "./MyContext/MyContext"
import './App.css';

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

        CollectionAPI.getCollections().then(([...collections]) => {
            this.setState({collections: [...collections] })
        })

        BookmarkAPI.getBookmarks().then(([...bookmarks]) => {
            this.setState({bookmarks: [...bookmarks] })
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
