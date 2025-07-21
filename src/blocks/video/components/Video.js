import { useState, useEffect } from "react";

const Video = ({ data, setAttributes }) => {
  const getVideoProvider = (url) => {
    if (!url) return null;
    if (url.includes("youtube.com") || url.includes("youtu.be")) return "youtube";
    if (url.includes("vimeo.com")) return "vimeo";
    if (url.includes("cdn.jwplayer.com")) return "jwplayer";
    return null;
  };

  const getThumbnail = (url, provider) => {
    if (!url || !provider) return "";

    if (provider === "youtube") {
      const videoId =
        url.split("v=")[1]?.split("&")[0] ||
        url.split("youtu.be/")[1]?.split("?")[0];
      return `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
    }

    if (provider === "vimeo") {
      const vimeoId = url.split("vimeo.com/")[1]?.split("/")[0];
      return `https://vumbnail.com/${vimeoId}_large.jpg`;
    }

    if (provider === "jwplayer") {
      // Extract video ID from URL: https://cdn.jwplayer.com/players/fA9n2qFx-xKzIoeCN.html
      const match = url.match(/\/players\/([a-zA-Z0-9]+)-/);
      const mediaId = match?.[1];
      return mediaId ? `https://cdn.jwplayer.com/thumbs/${mediaId}-720.jpg` : "";
    }

    return "";
  };

  const [thumbnail, setThumbnail] = useState("");
  const videoProvider = getVideoProvider(data.video_url);

  useEffect(() => {
    if (!data.video_url) return;

    const provider = getVideoProvider(data.video_url);

    setAttributes({ video_provider: provider });

    if (provider === "youtube") {
      const videoId =
        data.video_url.split("v=")[1]?.split("&")[0] ||
        data.video_url.split("youtu.be/")[1]?.split("?")[0];
      const maxResUrl = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
      const fallbackUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

      fetch(maxResUrl)
        .then((res) => {
          if (res.ok) {
            setThumbnail(maxResUrl);
          } else {
            setThumbnail(fallbackUrl);
          }
        })
        .catch(() => {
          setThumbnail(fallbackUrl);
        });
    } else {
      const thumb = getThumbnail(data.video_url, provider);
      setThumbnail(thumb);
    }
  }, [data.video_url]);

  return (
    <div className="N360Blocks__video">
      {thumbnail ? (
        <>
          <img
            className={`N360Blocks__thumbnail ${data.ratio || ""}`}
            src={thumbnail}
            alt="Video Thumbnail"
          />
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
      ) : (
        <div className="N360Blocks__error">Unsupported video URL</div>
      )}
    </div>
  );
};

export default Video;
