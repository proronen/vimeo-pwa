import { Button } from "@mui/material";
import './DownloadResource.css';
import { downloadVideoFile } from '../../services/downloadService' 

const DownloadResource = props => {

    return (
        <>
            {props.type === 'video' && props.resourcePath && <Button onClick={() => downloadVideoFile(props.resourcePath)} variant="contained" color="primary" > 
                Download
            </Button>}
        </>
    )
}

export default DownloadResource;