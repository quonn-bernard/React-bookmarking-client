import React, { Component } from 'react';
import appContext from "../appContext/appContext"
import config from "../config";
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

class BookmarkDesc extends Component {
    static defaultProps = {
        match: {
            params: {}
        },
        onDelete: () => {},
        bookmarks: []
    }

    static contextType = appContext;

    handleBackBtn = () => {
        this.props.history.push('/')
    }

    handleClickDelete = e => {
        e.preventDefault()
        const { bookmarkId } = this.props.match.params

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
        const extLinkIcon = <FontAwesomeIcon  icon={faExternalLinkAlt} className="" />
        
        // http://api.screenshotlayer.com/api/capture? access_key = 61195edb33dea3bafaaebb353570c8e8& url = http%3A%2F%2Fwebsite.com%3Fexample%3Dyes
        const { bookmarkId } = this.props.match.params
        
            const myBookmark = this.props.bookmarks.filter((bookmark) => bookmark.id === parseInt(bookmarkId))
            // console.log(encodeURIComponent(myBookmark[0].content))   
            //  let url = `http://api.screenshotlayer.com/api/capture?access_key=61195edb33dea3bafaaebb353570c8e8&url=${encodeURIComponent(myBookmark[0].content)}`;
            //  console.log(url) 
            //  let urlScreenshot = fetch(url).then(function(response) {
            //     console.log(response); // "opaque"
            //   })
              let medium;

              switch(myBookmark[0].type) { 
                case 'link': { 
                    let link = `https://${myBookmark[0].content}`;
                    medium = <a href={link} target="_blank" style={{color: "white", background: "green", borderRadius: "5px", padding: "5px 7px"}}>{extLinkIcon}{myBookmark[0].content}</a>; 
                   break; 
                } 
                case 'image': { 
                    medium = <img src={myBookmark[0].content} style={{height: "200px", width: "200px", border: "3px solid white", boxShadow: "3px 3px 3px #333", borerRadius: "5px"}}></img>; 
                    // medium = <img 
                    // src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"
                    // alt="new"
                    // />
                   break; 
                } 
                case 'text': { 
                    medium = <p style={{maxWidth: "50%", fontSize: "20px", border: "1px solid green", boxShadow: "3px 3px 3px #333", padding: "15px", color: "white", backgroundImage: "linear-gradient(to bottom right,#5e6061,springgreen)"}} src={myBookmark[0].content}>"{myBookmark[0].content}"</p>;
                   break; 
                } 
            }
            //   let link = `https://${myBookmark[0].content}`;
            //   (myBookmark[0].type === "link")
            //     ? 
            //     // : medium = myBookmark[0].content
            //     : medium = 'TEST'
            
             return (
            <div className="actual-bookmark">
                <h1>
                   "{myBookmark[0].name}" 
                </h1>
                {/* <p>{urlScreenshot}</p> */}
                <p>Posted on <span className="green-text">{myBookmark[0].modified}.</span></p>
                <hr></hr>
                <p>({myBookmark[0].type})</p>
                <p>{medium}</p>
                
                
            </div>
        )
    }
}



BookmarkDesc.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    modified: PropTypes.string,
    content: PropTypes.string,
  };

export default BookmarkDesc;
