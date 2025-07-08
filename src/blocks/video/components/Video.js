import { useState, useEffect } from "react";

const Video = ({data, setAttributes}) => {

  const getVideoProvider = (url) => {
    if (!url) return null;
    if (url.includes("youtube.com") || url.includes("youtu.be")) return "youtube";
    if (url.includes("vimeo.com")) return "vimeo";
    if (url.includes("facebook.com")) return "facebook";
    return null;
  };

  const getThumbnail = (url, provider) => {
    if (provider === "youtube") {
      const videoId = url.split("v=")[1]?.split("&")[0] || url.split("youtu.be/")[1]?.split("?")[0];
      return `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
    }
    if (provider === "vimeo") {
      return `https://vumbnail.com/${url.split("vimeo.com/")[1]}_large.jpg`;
    }
    return "";
  };

  const [thumbnail, setThumbnail] = useState("");
  const videoProvider = getVideoProvider(data.video_url);

  useEffect(() => {
    if (videoProvider === "youtube") {
      const videoId = data.video_url.split("v=")[1]?.split("&")[0] || data.video_url.split("youtu.be/")[1]?.split("?")[0];
      const maxResUrl = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
      const fallbackUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

      // Check if maxresdefault exists, otherwise fallback to hqdefault
      fetch(maxResUrl).then((res) => {
        if (res.ok) {
          setThumbnail(maxResUrl);
        } else {
          setThumbnail(fallbackUrl);
        }
      }).catch(() => {
        setThumbnail(fallbackUrl);
      });
    } else {
      setThumbnail(getThumbnail(data.video_url, videoProvider));
    }
    setAttributes({ video_provider: videoProvider });
  }, [data.video_url, videoProvider]);

  return (
  <div class="N360Blocks__video">
    {
      thumbnail && <>
        <img className="N360Blocks__thumbnail" src={thumbnail} alt="Video Thumbnail" />

        <div className="N360Blocks__controls">
          <div className="N360Blocks__controls-group">
            <button type="button" className="N360Blocks__controls-btn">
              <span className="dashicons dashicons-controls-back"></span>
            </button>
            <button type="button" className="N360Blocks__controls-btn N360Blocks__controls-btn--play">
              <span className="dashicons dashicons-controls-play"></span>
            </button>
            <button type="button" className="N360Blocks__controls-btn">
              <span className="dashicons dashicons-controls-forward"></span>
            </button>
          </div>

          <div className="N360Blocks__progress">
            <input
              type="range"
              className="N360Blocks__progress-bar"
              defaultValue={0}
              min="0"
              max="100"
              step="0.1"
            />
          </div>

          <div className="N360Blocks__volume">
            <button type="button" className="N360Blocks__controls-btn">
              <span className="dashicons dashicons-controls-volumeon"></span>
            </button>
            <input
              type="range"
              className="N360Blocks__volume-slider"
              defaultValue={80}
              min="0"
              max="100"
              step="1"
            />
          </div>
        </div>
      </>

    }
    {
      videoProvider != 'youtube' && videoProvider != 'vimeo' && <div class="N360Blocks__error">Unsupported video URL</div>
    }
  </div>
  );
};

export default Video;
