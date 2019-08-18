import React, { Component } from 'react';
import ValidationError from "../../Components/ValidationError/ValidationError";
import config from "../../config";
import appContext from "../../appContext/appContext";
import TokenService from "../../services/token-service";
import { withRouter } from "react-router";
import { Link, Redirect } from "react-router-dom";

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
            type: this.bookmarkType,
            nameValid: false,
            contentValid: false,
            formValid: false,
            validationMessages: {
                name: '',
                content: '',
                collectionName: '',
                type: ''
            }
        }
    }

    static contextType = appContext;

    formValid() {
        this.setState({ formValid: this.state.nameValid, formValid: this.state.contentValid });
    }

    validateVals(fieldValue) {
        const fieldErrors = {
            ...this.state.validationMessages
        };
        let hasError = false;

        (Object.entries(fieldValue)).forEach(value => {

            if (value[0] === "name" && value[1].length < 3) {
                // alert(`${value[0]} must be longer than 3 letters`)
                fieldErrors.name = `${value[0]} must be longer than 3 letters`
                hasError = true;
            } else if (value[0] === "content" && value[1].length < 3) {
                // alert(`${value[0]} must be longer than 3 letters`);
                fieldErrors.content = `${value[0]} must be longer than 3 letters`;
                hasError = true;
            }

            this.setState({
                validationMessages: fieldErrors,
                nameValid: !hasError,
                contentValid: !hasError
            }, this.formValid);
        })
        // fieldValue = fieldValue.trim();

    }

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
        let collection = this.context.collections.filter(collection => {
            return collection.name === this.state.collectionName
        })

        const bookmarkModified = new Date();
        const newBookmark = {
            name: this.state.bookmarkName,
            modified: bookmarkModified.toISOString(),
            collection_id: collection[0].id,
            content: this.state.bookmarkContent,
            type: this.state.type
        }
        this.validateVals(newBookmark)
        // if(this.state.validationMessages){
            this.AddBookmark(newBookmark);
        // }else{
        //     console.log("gggggg")
        // }
        
    }

    render() {
        let contentInput;
        let placeholderVal;
        if (this.state.type === "text") {
            placeholderVal = "Enter Text Here"
            contentInput = <><label htmlFor="bookmarkContent">Content</label>
                <textarea id="bookmarkContent" name="bookmarkContent" placeholder={placeholderVal} ref={this.bookmarkContent} onChange={e => this.updateContent(e.target.value)} required></textarea>
            </>
        } else if (this.state.type === "image") {
            placeholderVal = "https://yourimgurl.jpg"
            contentInput = <><label htmlFor="bookmarkContent">Image Address</label>
                <input id="bookmarkContent" name="bookmarkContent" placeholder={placeholderVal} ref={this.bookmarkContent} onChange={e => this.updateContent(e.target.value)} required></input>
            </>
        } else {
            placeholderVal = "Enter Website Address Here"
            contentInput = <><label htmlFor="bookmarkContent">Webpage Address</label>
                <input id="bookmarkContent" name="bookmarkContent" placeholder={placeholderVal} ref={this.bookmarkContent} onChange={e => this.updateContent(e.target.value)} required></input>
            </>
        }

        if (!TokenService.hasAuthToken()) {
            return <Redirect to='/login' />
        }
        return (
            <form onSubmit={e => this.handleSubmit(e)}>
                <ValidationError
                    className="validation-error"
                    hasError={!this.state.nameValid}
                    message={this.state.validationMessages.name} />
                <ValidationError
                    hasError={!this.state.contentValid}
                    message={this.state.validationMessages.content} />
                <label htmlFor="bookmarkName">BookmarkName</label>
                <input id="bookmarkName" name="bookmarkName" ref={this.nameInput} placeholder="Enter A Name" onChange={e => this.updateName(e.target.value)} required></input>
                <label htmlFor="type">Bookmark Type</label>
                <select onChange={e => this.updateType(e.target.value)}>
                    <option value='link'>Link</option>
                    <option value='image'>Image</option>
                    <option value='text'>Text</option>
                </select>
                {contentInput}
                <label htmlFor="collection">Collection</label>
                <select onChange={e => this.updateCollection(e.target.value)}>
                    {this.context.collections.map(collection =>
                        (this.context.profile.id === parseInt(collection.author))
                            ? <option key={collection.id} value={collection.name}>{collection.name}</option>
                            : null
                    )}
                </select>
                <button>Submit Bookmark</button>
            </form>
        )
    }
}

export default withRouter(AddBookmarkForm);