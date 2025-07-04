import React, { useState, useEffect, useRef } from "react";

const VimeoPlayer = ({ data }) => {
  const playerRef = useRef(null);
  const playerInstance = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1); // Vimeo volume is from 0 to 1
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const loadVimeoAPI = () => {
      if (!window.Vimeo) {
        const tag = document.createElement("script");
        tag.src = "https://player.vimeo.com/api/player.js";
        tag.onload = initializePlayer;
        document.body.appendChild(tag);
      } else {
        initializePlayer();
      }
    };

    loadVimeoAPI();

    return () => {
      if (playerInstance.current) {
        playerInstance.current.unload();
      }
    };
  }, [data.video_url]);

  const initializePlayer = () => {
    if (!data.video_url) return;
    const videoId = extractVimeoId(data.video_url);
    if (!videoId) return;

    const iframe = document.createElement("iframe");
    iframe.src = `https://player.vimeo.com/video/${videoId}?muted=0&controls=0&autopause=1&playsinline=1`;
    iframe.allow = "autoplay; fullscreen; picture-in-picture";
    iframe.width = "100%";
    iframe.height = "400";
    iframe.frameBorder = "0";

    playerRef.current.innerHTML = "";
    playerRef.current.appendChild(iframe);

    const player = new window.Vimeo.Player(iframe);
    playerInstance.current = player;

    player.on("play", () => setIsPlaying(true));
    player.on("pause", () => setIsPlaying(false));
    player.on("timeupdate", (e) => {
      if (e.duration) {
        setProgress((e.seconds / e.duration) * 100);
      }
    });
    player.setVolume(volume);
  };

  const extractVimeoId = (url) => {
    const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    return match ? match[1] : null;
  };

  const togglePlayPause = async () => {
    if (!playerInstance.current) return;
    const state = await playerInstance.current.getPaused();
    state ? playerInstance.current.play() : playerInstance.current.pause();
  };

  const seekForward = () => {
    if (playerInstance.current) {
      playerInstance.current.getCurrentTime().then((currentTime) => {
        playerInstance.current.setCurrentTime(currentTime + 10);
      });
    }
  };

  const seekBackward = () => {
    if (playerInstance.current) {
      playerInstance.current.getCurrentTime().then((currentTime) => {
        playerInstance.current.setCurrentTime(Math.max(0, currentTime - 10));
      });
    }
  };

  const setVideoVolume = (value) => {
    const vol = value / 100;
    if (playerInstance.current) {
      playerInstance.current.setVolume(vol);
      setVolume(vol);
    }
  };

  const toggleMute = () => {
    if (!playerInstance.current) return;
    if (isMuted) {
      playerInstance.current.setVolume(volume);
    } else {
      playerInstance.current.setVolume(0);
    }
    setIsMuted(!isMuted);
  };

  const handleProgressChange = (e) => {
    const newProgress = e.target.value;
    setProgress(newProgress);
    if (playerInstance.current) {
      playerInstance.current.getDuration().then((duration) => {
        const time = (newProgress / 100) * duration;
        playerInstance.current.setCurrentTime(time);
      });
    }
  };

  console.log("Vimeo Player", isPlaying);

  return (
    <div className="N360Blocks-controls-container vimeo-player">
      <div ref={playerRef}></div>
      <button className={`middle-play-btn ${isPlaying ? 'hidden' : ''}`} onClick={togglePlayPause}>
        <span className="dashicons dashicons-controls-play"></span>
      </button>
    </div>
  );
};

export default VimeoPlayer;
