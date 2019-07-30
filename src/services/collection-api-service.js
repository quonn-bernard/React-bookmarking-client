import config from '../config';

const CollectionApiService = {
    getCollections() {
      
        return fetch(`${config.API_ENDPOINT}/collections`).then(res =>
          {
            
            return (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
          }
            
        )
    },
    getCollectionsForUser(id) {
        return fetch(`${config.API_ENDPOINT}/collections/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(res =>
          {
          return (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
          }
        );
      }
}

export default CollectionApiService