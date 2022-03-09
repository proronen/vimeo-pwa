import moment from "moment";
import DownloadRescource from "../DownloadResource";

const VideoDetails = (props) => {
  return (
    <div className="video-details-cont">
      <div className="title">{props.name}</div>
      <div className="from-now">{moment(props.release_time).fromNow()}</div>
      <div className="creator">
        {/* We can add a defualt img here if this fails */}
        <img
          src={
            props.uploader &&
            props.uploader.pictures &&
            props.uploader.pictures.sizes &&
            props.uploader.pictures.sizes[0].link
          }
          alt=""
        />

        <div className="uploader-name">{props.user.name}</div>
      </div>
      <DownloadRescource {...{ type: "video", resourcePath: props.cdnpath }} />

      <div className="description" style={{ whiteSpace: "pre-wrap" }}>
        {props.description}
      </div>
    </div>
  );
};

export default VideoDetails;
