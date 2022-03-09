import React from 'react';

function LoadLocalFile () {
    return <React.Fragment>
        <input type="file" accept="video/*"/>
        <video controls autoplay></video>
    </React.Fragment>
}

export default LoadLocalFile;