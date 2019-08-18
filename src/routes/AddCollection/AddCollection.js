import React, {Component} from 'react';
import AddCollectionForm from "../../Components/AddCollectionForm/AddCollectionForm";

class AddCollection extends Component {

    render() {
        return (
          <div>
            <h1 className="form-header">Create A Collection</h1>
            <AddCollectionForm ></AddCollectionForm>
          </div>
        )
    }

}

export default AddCollection;
