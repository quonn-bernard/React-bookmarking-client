import config from '../config';

const BookmarkApiService = {
    getBookmarks() {
        return fetch(`${config.API_ENDPOINT}/bookmarks`).then(res =>
            (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
        )
    }
}

export default BookmarkApiService