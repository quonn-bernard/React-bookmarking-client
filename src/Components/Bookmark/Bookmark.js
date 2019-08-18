import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import appContext from "../../appContext/appContext"
import config from "../../config";
import PropTypes from 'prop-types';
import TokenService from "../../services/token-service";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

class Bookmark extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     hover: false
  //   }
  // }
  static defaultProps = {
    onDelete: () => { },
    hover: false
  }

  state={
    hover: false
  }



  static contextType = appContext;


  handleClickDelete = e => {
    e.preventDefault()
    const bookmarkId = this.props.id

    fetch(`${config.API_ENDPOINT}/bookmarks/${bookmarkId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'Authorization': `bearer ${TokenService.getAuthToken()}`
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

    hoverOn = () => {
    this.setState({ hover: true });
    }

    hoverOff = () => {
    this.setState({ hover: false });
  }
  //   ,
  //   hoverOn: function(){
  //   this.setState({ hover: true });
  // },
  // hoverOff: function() {
  //   this.setState({ hover: false });
  // },
  // render: function() {
  //   return (
  //     <i
  //       className={this.state.hover ? "fa fa-heart" : "fa fa-heart-o"}
  //       onMouseEnter={this.hoverOn}
  //       onMouseLeave={this.hoverOff}
  //     >
  //       {" "} My class is: {this.state.hover ? "fa-heart" : "fa-heart-o"}
  //     </i>
  //   );
  // }




  render() {
    const trashIcon = <FontAwesomeIcon style={{ fontSize: "12px", color: "springgreen"}} icon={faTrashAlt} />
    const penIcon = <FontAwesomeIcon style={{ fontSize: "12px", color: "springgreen"}} icon={faPencilAlt} />
    const { name, id, type } = this.props
    let btnClass;
    (this.state.hover)
    ? btnClass = ""
    : btnClass = "hidden"
    return (
      <div onMouseEnter={this.hoverOn} onMouseLeave={this.hoverOff}>
        <div key={id} className="bookmark-top">
          <header>
            <p>({type})</p>
          </header>
          <i>{this.props.icon}</i>
          <h1>
            <Link to={'/bookmark/' + id}> "{name}"  </Link>
          </h1>
          <p>CREATED BY: <span style={{ color: "springgreen", textTransform: "uppercase" }}>{this.context.profile.username}</span></p>


        </div>
        <div className="bookmark-bottom">
          <button type="button" className={btnClass} onClick={this.handleClickDelete}>{trashIcon} Delete</button>
          <span></span>
          <button type="button" className={btnClass} >{penIcon} Edit</button>
        </div>
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
