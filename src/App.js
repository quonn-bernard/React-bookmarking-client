import React, { Component } from 'react';
import { Link, Route, Redirect, withRouter } from 'react-router-dom';
import NavBar from './Components/NavBar/NavBar';
import MblNav from './Components/MblNav/MblNav';
import AccountPanel from './Components/AccountPanel/AccountPanel';
import BookmarkDesc from "./routes/BookmarkDesc";
import CollectionList from "./routes/CollectionList";
import CollectionAPI from './services/collection-api-service';
import TokenService from './services/token-service';
import BookmarkAPI from './services/bookmark-api-service';
import ProfileApiService from './services/profile-api-service';
import BookmarkList from "./routes/BookmarkList/BookmarkList";
import AddCollection from './routes/AddCollection/AddCollection';
import Registration from './routes/Registration/Registration';
import Login from './routes/Login/Login';
import AddBookmark from './routes/AddBookmark/AddBookmark';
import appContext from "./appContext/appContext"
import './App.css';

import RegistrationForm from './Components/RegistrationForm/RegistrationForm';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            collections: [],
            bookmarks: [],
            hamburgerOpen: false,
            profile: {}
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

    updateProfile = profile => {
        this.setState({
            profile: profile 
        })
    }

    componentDidMount() {

        CollectionAPI.getCollections().then(([...collections]) => {
            this.setState({ collections: [...collections] })
        })

        BookmarkAPI.getBookmarks().then(([...bookmarks]) => {
            this.setState({ bookmarks: [...bookmarks] })
        })
        
        if (TokenService.hasAuthToken()) {
            ProfileApiService.getProfile()
                .then(profile => {
                    return this.updateProfile(profile)
                })
        } else{
        
                return <Redirect to='/login' />
            
        }
    }

   
    render() {
        
        const value = {
            bookmarks: this.state.bookmarks,
            collections: this.state.collections,
            profile: this.state.profile,
            deleteBookmark: bookmarkId => this.handleDeleteBookmark({ bookmarkId }),
            AddCollection: (e) => this.handleAddCollection(e),
            AddBookmark: (e) => this.handleAddBookmark(e),
            updateProfile: (e) => this.setState({profile: e}),
            goBack: () => this.handleBackButton()
        }
        
        return (
            <appContext.Provider value={value}>
                <div className="App">

                    <NavBar swapOpen={this.swapOpen}></NavBar>
                    <MblNav open={this.state.hamburgerOpen}></MblNav>
                    <section className="bookmarksContentBody">
                        <aside>
                            <AccountPanel profile={value.profile} ></AccountPanel>
                            <nav>
                                {< Link to="/AddCollection" > <h4>Add Collection</h4> </Link>}
                                {< Link to="/AddBookmark" > <h4>Add Bookmark</h4> </Link>}
                            </nav>
                        </aside>
                        <main onClick={this.closeHamburger}>
                            {/* Renders CollectionList as soon as local storage gets authToken  */}
                            <Route exact path='/' render={(props) => <CollectionList {...props} profile={value.profile} collections={value.collections} />} />
                            
                            <Route path='/collection/:collectionId' render={(props) => <BookmarkList {...props} bookmarks={value.bookmarks} />} />
                            <Route path='/bookmark/:bookmarkId' render={(props) => <BookmarkDesc {...props} bookmarks={value.bookmarks} />} />
                            <Route exact path='/AddCollection' component={AddCollection} /> {/*Add Collection Form Path*/}
                            <Route path='/AddBookmark' component={AddBookmark} />{/* Add Bookmark Form Path */}
                            <Route path='/Register' component={Registration} />{/* Adds new users to database */}
                            <Route exact path='/login' render={(props) => <Login {...props} update={value.updateProfile} contextValues={value.up} />} />
                            {/* <Route exact path='/Login' render={(props) => <Login {...props} contextValues={value.bookmarks} />} /> */}
                        </main>
                    </section>
                </div>
            </appContext.Provider>
        );
    }
}

export default withRouter(App);
