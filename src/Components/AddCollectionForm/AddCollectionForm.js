import React, {Component} from 'react';
import ValidationError from "../../Components/ValidationError/ValidationError";
import config from "../../config";
import appContext from "../../appContext/appContext";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

// generates random ids for new collections
const uuidv4 = require('uuid/v4');

class AddCollectionForm extends Component {
    constructor(props) {
        super(props);
        this.nameInput = React.createRef();
        this.state = {
            name: this.nameInput,
            nameValid: false,
            formValid: false,
            validationMessages: {
                name: ''
            }
        }
    }

    static contextType = appContext;

    formValid() {
        this.setState({formValid: this.state.nameValid});
    }

    validateName(fieldValue) {
        const fieldErrors = {
            ...this.state.validationMessages
        };
        let hasError = false;

        fieldValue = fieldValue.trim();
        if (fieldValue.length === 0) {
            fieldErrors.name = 'Name is required';
            hasError = true;
        } else {
            if (fieldValue.length < 3) {
                fieldErrors.name = 'Name must be at least 3 characters long';
                hasError = true;
            } else {
                fieldErrors.name = '';
                hasError = false;
            }
        }

        this.setState({
            validationMessages: fieldErrors,
            nameValid: !hasError
        }, this.formValid);
    }

    guidGenerator() {
      let S4 = function() {
         return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
      };
      return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
  }

    AddCollection = name => {
      const collectionName = {id: uuidv4(), name: name};
      fetch(`${config.API_ENDPOINT}/collections`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(collectionName),
      })
        .then(res => {
          if (!res.ok)
            return res.json().then(e => Promise.reject(e))
          return res.json()
        })
        .then(() => {
          this.context.AddCollection(collectionName)
        })
        .catch(error => {
          console.error({ error })
        })
    }

    updateName(name) {
        this.setState({
            name
        }, () => {
            this.validateName(name)
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const name = this.state.name;
        this.AddCollection(name);
    }

    render() {
        return (
            <form className="" onSubmit={e => this.handleSubmit(e)}>
                <ValidationError
                    hasError={!this.state.nameValid}
                    message={this.state.validationMessages.name}/>
                <h1>Create A Collection</h1>
                <div className="form-group">
                    <label htmlFor="collectionName">Name *</label>
                    <input
                        type="text"
                        id="collectionName"
                        name="collectionName"
                        ref={this.nameInput}
                        placeholder="Enter Collection Name"
                        onChange={e => this.updateName(e.target.value)}></input>
                </div>
                <button
                    type="submit"
                    className="registration__button"
                    disabled={!this.state.formValid}>
                    Add Collection
                </button>
                <Link to="/"><button>Back</button></Link>
            </form>
        )
    }
}

export default withRouter(AddCollectionForm);
