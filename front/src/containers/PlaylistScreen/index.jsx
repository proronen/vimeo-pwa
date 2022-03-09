import { useEffect, useState } from "react";
import Video from "../../components/VideoPlayerTools/Video";
import PlayList from "../../components/VideoPlayerTools/PlayList";
import VideoDetails from "../../components/VideoPlayerTools/VideoDetails";
import axios from "../../axios";
import "../../components/VideoPlayerTools/VideoPlayer.css";
import CircularProgress from "@mui/material/CircularProgress";

const PlaylistScreen = () => {
  let [VideoList, setVideoList] = useState([]);
  let [current, setCurrent] = useState(0);
  let [hideLoader, setHideLoader] = useState(false);
  let [vidLoader, setVidLoader] = useState(false);

  useEffect(() => {
    getListData();
  }, []);

  const getListData = () => {
    axios("/api/get_playlist").then(async (res) => {
      // this will fade out the loading message
      await new Promise((resolve) => {
        setHideLoader(true);
        setTimeout(() => {
          resolve(true);
          return;
        }, 1000);
      });

      setVideoList(res.data.data);
    });
  };

  const setPlayedItem = (itemId) => {
    const item = VideoList[itemId];
    const videoId = item.uri.split("/").pop();

    axios
      .get("api/get_video_cdn_path?videoid=" + videoId)
      .then((res) => {
        // We will reterive the cdn_path for each request as we will not rely on addresses not changing on the cdn
        VideoList[itemId].cdnpath = res.data;
        setCurrent(itemId);
        setVidLoader(false);
      })
      .catch((e) => {
        console.log("error", e);
      });

    setVidLoader(true);
  };

  return (
    <>
      {VideoList.length ? (
        <>
          <div className="video-player-cont">
            <Video data={VideoList[current]} vidLoader={vidLoader} />
          </div>

          <div className={`underVideoCont ${vidLoader ? "add-opacity" : ""}`}>
            <VideoDetails {...VideoList[current]} />
            <PlayList video_list={VideoList} setPlayedItem={setPlayedItem} />
          </div>
        </>
      ) : (
        <div className={`loaderCont ${hideLoader ? "hide" : false}`}>
          <div>Please wait while the data is loading</div>
          <CircularProgress />
        </div>
      )}
    </>
  );
};

export default PlaylistScreen;
