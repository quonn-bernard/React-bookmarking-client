import React, { Component } from 'react';
import { Link, Route, Redirect, withRouter } from 'react-router-dom';
import NavBar from './Components/NavBar/NavBar';
import MblNav from './Components/MblNav/MblNav';
import AccountPanel from './Components/AccountPanel/AccountPanel';
import AsideBtn from './Components/AsideBtn/AsideBtn';
import { Logo } from './Components/Logo/Logo';
import { CollectionSearch } from './Components/CollectionSearch/CollectionSearch';
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faSignOutAlt, faAtlas, faFolder, faBookmark } from '@fortawesome/free-solid-svg-icons';
import './App.css';

import RegistrationForm from './Components/RegistrationForm/RegistrationForm';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            collections: [],
            bookmarks: [],
            hamburgerOpen: false,
            profile: {},
            filteredCollection: [],
            searchTerm: ''
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

    logout() {
        TokenService.clearAuthToken()
        this.setState({
            profile: {}
        })
    }

    componentDidMount() {

        CollectionAPI.getCollections().then(([...collections]) => {
            this.setState({ collections: [...collections], filteredCollection: [...collections] })
        })

        BookmarkAPI.getBookmarks().then(([...bookmarks]) => {
            this.setState({ bookmarks: [...bookmarks] })
        })

        if (TokenService.hasAuthToken()) {
            ProfileApiService.getProfile()
                .then(profile => {
                    return this.updateProfile(profile)
                })
        } else {

            return <Redirect to='/login' />

        }
    }

    handleFilterInputChange(e) {
        e.preventDefault()
        let collections = this.state.collections.filter(collection => {
            if (collection.name.includes(e.target.value) && this.state.collections.length && this.state.profile.id === parseInt(collection.author)) {
                return <div>{collection}</div>
            }
        })

        this.setState({
            filteredCollection: collections,
            searchTerm: e.target.value
        })
    }

    render() {
        const open = (!this.state.hamburgerOpen && 'ease-open') || 'ease-close';
        const over = (!this.state.hamburgerOpen && 'ease-right') || 'ease-left'; 
        const search = <FontAwesomeIcon icon={faSearch} className="" />
        const userIcon = <FontAwesomeIcon icon={faUser} className="btn-icon" />
        const signOutIcon = <FontAwesomeIcon icon={faSignOutAlt} className="btn-icon" />
        const atlasIcon = <FontAwesomeIcon icon={faAtlas} className="btn-icon" />
        const bookmarkIcon = <FontAwesomeIcon icon={faBookmark} className="btn-icon" />
        const folder = <FontAwesomeIcon style={{ marginLeft: "50px", marginTop: "-10px", fontSize: "26px" }} icon={faFolder} className=" thumbsUp fa-4x" />
        const resultFolder = <FontAwesomeIcon style={{ fontSize: "16px", color: "springgreen", marginRight: "5px" }} icon={faFolder} className="" />
        const shadowFolder = <FontAwesomeIcon style={{ marginLeft: "10px", fontSize: "26px", marginBottom: "-6px" }} icon={faFolder} className="shadowFolder fa-4x" />
        const bmFolder = <FontAwesomeIcon style={{ fontSize: "26px", margin: "15px 5px -10px 0", color: "springgreen"}} icon={faBookmark} className="shadowFolder fa-4x" />
        const value = {
            bookmarks: this.state.bookmarks,
            collections: this.state.collections,
            profile: this.state.profile,
            deleteBookmark: bookmarkId => this.handleDeleteBookmark({ bookmarkId }),
            AddCollection: (e) => this.handleAddCollection(e),
            AddBookmark: (e) => this.handleAddBookmark(e),
            updateProfile: (e) => this.setState({ profile: e }),
            goBack: () => this.handleBackButton()
        }

        return (
            <appContext.Provider value={value}>
                <div className="App">

                    <NavBar swapOpen={this.swapOpen}>
                        <Logo>
                            <span style={{ fontSize: "11px" }} className="folder">{shadowFolder}{folder}</span>
                            <span style={{ textDecoration: "none", fontSize: "20px", marginLeft: "4px", color: "white", fontStyle: "italic" }}>BOOKMARKER</span>
                        </Logo>
                    </NavBar>
                    {/* <MblNav open={this.state.hamburgerOpen}></MblNav> */}
                    <section className="bookmarksContentBody">

                        {/* Sidebar will contain 4 buttons and a search box filter*/}
                        <aside  id="sidebar" className={open} >
                            <div>
                                <AccountPanel icon={userIcon} profile={value.profile} ></AccountPanel>
                                {(TokenService.hasAuthToken())
                                    ? < Link onClick={this.logout}> <AsideBtn icon={signOutIcon} name={'Logout'}></AsideBtn> </Link>
                                    : <AsideBtn name={'Please Login'}></AsideBtn>}

                                {< Link to="/AddCollection" > <AsideBtn icon={atlasIcon} name="Create Collection"></AsideBtn> </Link>}
                                {< Link to="/AddBookmark" > <AsideBtn icon={bookmarkIcon} name={'Create Bookmark'}></AsideBtn> </Link>}
                            </div>

                            {/* Grey area beneath last sidebar button/ features search box filter */}
                            <div className="bottom-sidebar">
                                <CollectionSearch>
                                    <input placeholder="Search Collections" onChange={(e) => this.handleFilterInputChange(e)}></input>
                                    <button>{search}</button>
                                </CollectionSearch>
                                <div className="results-text">
                                    <p>RESULTS</p>
                                </div>

                                <div id="sidebar-filter">
                                    {(this.state.filteredCollection.length > 0)
                                        ? this.state.filteredCollection.map(collection => {
                                            if(parseInt(collection.author) === this.state.profile.id)
                                            return <div className="sidebar-filter-result"><Link to={"/collection/" + collection.id}>{resultFolder}{collection.name}</Link></div>
                                        })
                                        : null}
                                </div>

                            </div>
                        </aside>
                        <main onClick={this.closeHamburger} className={over}>
                            {/* Renders CollectionList as soon as local storage gets authToken  */}
                            <Route exact path='/' render={(props) => <CollectionList {...props} profile={value.profile} collections={value.collections} />} />

                            <Route path='/collection/:collectionId' render={(props) => <BookmarkList {...props} icon={bmFolder} bookmarks={value.bookmarks} />} />
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
