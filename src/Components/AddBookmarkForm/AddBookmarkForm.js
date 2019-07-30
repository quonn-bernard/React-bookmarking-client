import React, { Component } from 'react';
import config from "../../config";
import appContext from "../../appContext/appContext";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

class AddBookmarkForm extends Component {
    constructor(props) {
        super(props)
        this.nameInput = React.createRef();
        this.bookmarkContent = React.createRef();
        this.collectionName = React.createRef();
        this.type = React.createRef();

        this.state = {
            bookmarkName: this.nameInput,
            bookmarkContent: this.bookmarkContent,
            collectionName: this.collectionName,
            type: this.bookmarkType
        }
    }

    static contextType = appContext;

    // formValid() {
    //     this.setState({ formValid: this.state.nameValid });
    // }

    // validateVals(fieldValue) {
    //     const fieldErrors = {
    //         ...this.state.validationMessages
    //     };
    //     let hasError = false;

    //     fieldValue = fieldValue.trim();
    //     if (fieldValue.length === 0) {
    //         fieldErrors.name = 'Name is required';
    //         hasError = true;
    //     } else {
    //         if (fieldValue.length < 3) {
    //             fieldErrors.name = 'Name must be at least 3 characters long';
    //             hasError = true;
    //         } else {
    //             fieldErrors.name = '';
    //             hasError = false;
    //         }
    //     }

    //     this.setState({
    //         validationMessages: fieldErrors,
    //         nameValid: !hasError
    //     }, this.formValid);
    // }

    AddBookmark = bookmark => {
        fetch(`${config.API_ENDPOINT}/bookmarks`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(bookmark),
        })
            .then(res => {
                if (!res.ok)
                    return res.json().then(e => Promise.reject(e))
                return res.json()
            })
            .then(() => {
                this.context.AddBookmark(bookmark)
            })
            .catch(error => {
                console.error({ error })
            })
    }

    updateName(input) {
        this.setState({
            bookmarkName: input,
        });
    }

    updateContent(input) {
        this.setState({
            bookmarkContent: input,
        });
    }

    updateCollection(input) {
        this.setState({
            collectionName: input
        });
    }

    updateType(input) {
        this.setState({
            type: input
        });
    }

    handleSubmit(event) {
            event.preventDefault();
        alert(this.context)
        let collection = this.context.collections.filter(collection => {
        
            return collection.name === this.state.collectionName
        })

        console.log(collection)

        const bookmarkModified = new Date();
        const newBookmark = {
            // id: uuidv4(),
            name: this.state.bookmarkName,
            modified: bookmarkModified.toISOString(),
            collection_id: collection[0].id,
            content: this.state.bookmarkContent,
            type: this.state.type
        }

        console.log(newBookmark)
        this.AddBookmark(newBookmark);
    }

    render() {
 
        return (
            <form onSubmit={e => this.handleSubmit(e)}>
                <label htmlFor="bookmarkName">BookmarkName</label>
                <input id="bookmarkName" name="bookmarkName" ref={this.nameInput} onChange={e => this.updateName(e.target.value)} required></input>
                <label htmlFor="bookmarkContent">Content</label>
                <input id="bookmarkContent" name="bookmarkContent" ref={this.bookmarkContent} onChange={e => this.updateContent(e.target.value)} required></input>
                <label htmlFor="collection">Collection</label>
                {/* <input id="collection" name="collection" ref={this.collectionName} onChange={e => this.updateCollection(e.target.value)} required></input> */}
                <select onChange={e => this.updateCollection(e.target.value)}>
                    {this.context.collections.map(collection =>
                        <option key={collection.id} value={collection.name}>{collection.name}</option>
                    )}
                </select>
                <label htmlFor="type">Bookmark Type</label>
                <select onChange={e => this.updateType(e.target.value)}>
                <option value='link'>Link</option>
                <option value='image'>Image</option>
                <option value='text'>Text</option>
                </select>
                <button>Add Bookmark</button>
                <Link to="/"><button>Back</button></Link>
            </form>
        )
    }
}

AddBookmarkForm.defaultProps = {
    collectionName: 'Movies'
  };

export default withRouter(AddBookmarkForm);