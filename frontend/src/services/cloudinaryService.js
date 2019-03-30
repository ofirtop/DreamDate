export default {
    uploadImg,

}
const CLOUD_UPLOAD_PRESET = 'dgdlcsa7'
const CLOUD_NAME = "dgo4v1hnv"
import axios from 'axios';

// const CLOUD_NAME = "dtznb3f7l"

var UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

// on submit call to this function
function uploadImg(elForm, ev) {
    console.log('Cloudinary service got:', elForm, ev);
    ev.preventDefault();
    return doUploadImg(elForm)
        .then(url => url)
}
function doUploadImg(elForm) {

    var formData = new FormData();
    formData.append('file', elForm)
    formData.append('upload_preset', CLOUD_UPLOAD_PRESET);
    return axios({
        url: UPLOAD_URL,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: formData
    })
        .then(function (res) {
            console.log('SECURE_URL:', res.data.secure_url);
            return res.data.secure_url;
        })
        .catch(function (error) {
            console.error('Upload failed! Err: ', error)
        })
}
