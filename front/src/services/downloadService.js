import axios from '../axios';

export const downloadVideoFile = path => {
    axios.get('api/download_video?video_src=' + encodeURIComponent(path));
    checkProgress()
    return false
}

const checkProgress = () => {
    // setInterval(() => {
    //     fetch("http://localhost:8000/api/get_download_progress")
    //     .then( res => console.log('res', res.body))
    // }, 1000); 
}
