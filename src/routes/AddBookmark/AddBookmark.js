import React, {Component} from 'react';
import AddBookmarkForm from "../../Components/AddBookmarkForm/AddBookmarkForm";

class AddBookmark extends Component {

    render() {

        return (

            <div>
                <h1 className="form-header">Create A Bookmark</h1>
                <AddBookmarkForm></AddBookmarkForm>
            </div>

        )

    }

}

export default AddBookmark;
