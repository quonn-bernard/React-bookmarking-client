import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import appContext from "../../appContext/appContext"
import config from "../../config";
import PropTypes from 'prop-types';

class Bookmark extends Component {
  
  static defaultProps ={
    onDelete: () => {},
  }

  static contextType = appContext;

  handleClickDelete = e => {
    e.preventDefault()
    const bookmarkId = this.props.id

    fetch(`${config.API_ENDPOINT}/bookmarks/${bookmarkId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(() => {
        this.context.deleteBookmark(bookmarkId)
        // allow parent to perform extra behaviour
        this.props.onDelete(bookmarkId)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render() {
    
    const { name, id, modified } = this.props
    return (
        <div key={id}>
            <h1>
            <Link to={'/bookmark/'+ id}>  {name}  </Link> 
            </h1>
            <button type="button" onClick={this.handleClickDelete}>Delete</button>
            <p>{modified}</p>
        </div>
    )
  }
}

Bookmark.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  modified: PropTypes.string,
};
export default Bookmark;
