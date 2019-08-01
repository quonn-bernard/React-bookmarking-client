import React from 'react';

export default React.createContext({
    bookmarks: [], 
    collections: [],
    profile: {}, 
    AddCollection: () => {},
    AddBookmark: () => {}, 
    goBack: () => {},
    updateProfile: () => {}
})
