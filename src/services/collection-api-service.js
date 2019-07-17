import config from '../config';

const CollectionApiService = {
    getCollections() {
        return fetch(`${config.API_ENDPOINT}/collections`).then(res =>
            (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
        )
    }
}

export default CollectionApiService