import axios from 'axios'
import { SKILLBUILDER_BASE_URL } from "../../constants/index";
import { request } from "../../util/APIUtils";
import Encryption from './Encryption';


class UserServices {

    loginUser(formData) {
        return request({
            url: SKILLBUILDER_BASE_URL + "api/signin/",
            method: 'POST',
            body: formData,
            multipart: true
        });
    }

    fetchGroup() {
        return fetch(SKILLBUILDER_BASE_URL + 'event/', )
    }
    group(){
        return fetch(SKILLBUILDER_BASE_URL + 'group/',)

    }

    topgroupadmin1(){
        return fetch(SKILLBUILDER_BASE_URL + 'topgroupadmin/',)

    }

    topgroup1(User_id){
        return fetch(SKILLBUILDER_BASE_URL + 'topgroup/'+User_id,)

    }

    subscribe(e) {
        const  encryptedData = localStorage.getItem("encrypted");
        return fetch(SKILLBUILDER_BASE_URL + 'member/', {
            
            method: 'POST',
            body: JSON.stringify({
                "grp_ID": e.split("/")[1], "user_ID": new Encryption().decrypt(encryptedData).userId, "role": "user", "gpName": e.split("/")[0], "first_name":new Encryption().decrypt(encryptedData).username
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
    }
    fetchMessage() {
        return fetch(SKILLBUILDER_BASE_URL + 'message')

    }

    updateuserdetails(e) {
        const  encryptedData = localStorage.getItem("encrypted");
        return fetch(SKILLBUILDER_BASE_URL + 'updateuserdetails', {
            method: 'POST',
            body: JSON.stringify({
                "id": new Encryption().decrypt(encryptedData).userId, 
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
    }

    userdetails(){
        return fetch(SKILLBUILDER_BASE_URL + 'userdetails')
    }
    PostMessage(formdata) {
        return fetch(SKILLBUILDER_BASE_URL + 'message/', {
            method: 'POST',
            body: formdata,

        })
    }
    LeaveGroup(id) {
        return fetch(SKILLBUILDER_BASE_URL + 'member/' + id + "/", {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
    }
    DelMsg(e) {
        return fetch(SKILLBUILDER_BASE_URL + 'message/' + e + "/", {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
    }
    register() {
        return fetch(SKILLBUILDER_BASE_URL + 'api/signin/', {
            method: 'GET',

        })
    }

    fetchUserid() {
        const  encryptedData = localStorage.getItem("encrypted");
        return fetch(SKILLBUILDER_BASE_URL + 'api/signin/' +new Encryption().decrypt(encryptedData).userId + '/', {

        })
    }

    // registerfnUser(formdata) {
    //     return fetch(SKILLBUILDER_BASE_URL + 'user/', {
    //         method: 'POST',
    //         body: formdata

    //     })
    // }
  
    registerUser(formData)
    {
        const config = {     
            headers: { 'content-type': 'application/json' }
        }
       return  axios.post(`${SKILLBUILDER_BASE_URL}api/signup/`,formData,config);
    }

    
    

}
export default new UserServices