const PlayList = (props) => {
  const setItem = (item) => {
    props.setPlayedItem(item);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="playlist-cont">
      {props.video_list.map((item, i) => {
        return (
          <div key={i} className="playlist-item">
            <div className="playlist-item-img" onClick={() => setItem(i)}>
              <img src={item.pictures.base_link} alt={item.name} />
            </div>
            <div className="playlist-item-desc">
              <div
                className="playlist-item-desc-title"
                onClick={() => setItem(i)}
              >
                {item.name}
              </div>
              <div
                className="playlist-item-desc-user"
                onClick={() => setItem(i)}
              >
                {item.user.name}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PlayList;
