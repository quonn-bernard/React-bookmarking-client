import config from '../config';
import TokenService from '../services/token-service';

//gets user profile info
 const ProfileApiService = {
    getProfile(){
        return fetch(`${config.API_ENDPOINT}/profile`, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
        .then(res=> 
            (!res.ok)
            ? res.json().then(e=>Promise.reject(e))
            :res.json()
            );
    }
}

export default ProfileApiService;