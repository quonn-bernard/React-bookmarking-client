import React from 'react';
import './CollectionSearch.css';


export const CollectionSearch = (props) => {
    return (
            <div className="collection-search-input">
                {props.children}
            </div> 
    )
}